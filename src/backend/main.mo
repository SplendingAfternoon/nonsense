import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "mo:caffeineai-object-storage/Storage";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";

actor {
  // Access control state must not be exported to keep it private
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data types
  public type Project = {
    id : Text;
    name : Text;
    description : Text;
    image : Storage.ExternalBlob;
    technologies : [Text];
    githubLink : Text;
    isActive : Bool;
  };

  public type Product = {
    id : Text;
    name : Text;
    description : Text;
    images : [Storage.ExternalBlob];
    price : Nat;
    currency : Text;
    specifications : [(Text, Text)];
    isAvailable : Bool;
  };

  public type UserProfile = {
    name : Text;
  };

  public type ContactSubmission = {
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type Order = {
    id : Text;
    user : Principal;
    products : [Text];
    amount : Nat;
    status : Text;
    stripeSessionId : ?Text;
    timestamp : Time.Time;
  };

  // Persistent data stores
  let projects = Map.empty<Text, Project>();
  let products = Map.empty<Text, Product>();
  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  let orders = Map.empty<Text, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var stripeConfig : ?Stripe.StripeConfiguration = null;
  let sessionOwners = Map.empty<Text, Principal>();

  // Include MixinStorage functionality
  include MixinObjectStorage();

  // Project management
  public shared ({ caller }) func addProject(project : Project) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add projects");
    };
    projects.add(project.id, project);
  };

  public query ({ caller }) func getProjects() : async [Project] {
    projects.values().toArray();
  };

  public shared ({ caller }) func updateProject(id : Text, project : Project) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update projects");
    };
    projects.add(id, project);
  };

  public shared ({ caller }) func deleteProject(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete projects");
    };
    projects.remove(id);
  };

  // Project filtering
  public query ({ caller }) func filterProjects(technology : Text) : async [Project] {
    let filteredProjects = projects.filter(
      func(_id, project) {
        project.technologies.filter(func(t) { t == technology }).size() > 0;
      }
    );
    filteredProjects.values().toArray();
  };

  // Product management
  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    products.add(product.id, product);
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public shared ({ caller }) func updateProduct(id : Text, product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    products.add(id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(id);
  };

  // Product filtering
  public query ({ caller }) func filterProducts(availability : Bool) : async [Product] {
    let filteredProducts = products.filter(
      func(_id, product) {
        product.isAvailable == availability;
      }
    );
    filteredProducts.values().toArray();
  };

  // Contact submissions
  public shared ({ caller }) func submitContactForm(email : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      email;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(email, submission);
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view submissions");
    };
    contactSubmissions.values().toArray();
  };

  // User profiles
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Stripe integration
  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public query ({ caller }) func isStripeConfigured() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can check Stripe configuration");
    };
    stripeConfig != null;
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    switch (sessionOwners.get(sessionId)) {
      case (null) {
        Runtime.trap("Session not found");
      };
      case (?owner) {
        if (caller != owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only check your own session status");
        };
      };
    };
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create checkout sessions");
    };
    let sessionId = await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
    // Track session ownership for authorization checks
    sessionOwners.add(sessionId, caller);
    sessionId;
  };

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
