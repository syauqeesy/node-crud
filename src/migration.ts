import Config from "./application/Config";
import Database from "./application/Database";

const config = new Config();
const database = new Database(config);

export default database.getDataSource();
