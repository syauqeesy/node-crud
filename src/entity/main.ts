import { DataSource, Repository } from "typeorm";

import User from "./User";

type repository = {
  user: Repository<User>;
};

const newRepository = (dataSource: DataSource): repository => {
  const r: repository = {
    user: dataSource.manager.getRepository(User),
  };

  return r;
};

export { newRepository, repository, User as UserEntity };
