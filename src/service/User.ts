import Service from "./Service";

interface UserService {}

class User extends Service implements UserService {}

export { UserService, User };
