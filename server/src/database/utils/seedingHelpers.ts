// Upload edited entities after using make to not upload first.
export const editEntities = async (serv, ent, func) => {
  for (let i = 0; i < ent.length; i++) {
    func(ent[i]);
  }
};

export const saveEntities = async (serv, ent) => {
  for (let i = 0; i < ent.length; i++) {
    await serv.save(ent[i]);
  }
};

export const editSaveEntities = async (serv, ent, func) => {
  for (let i = 0; i < ent.length; i++) {
    await serv.save(func(ent[i]));
  }
};

export const getRandom = (length: number) => {
  let val = Math.floor(Math.random() * length);
  if (val === 0) val = 1;
  return +val;
};
