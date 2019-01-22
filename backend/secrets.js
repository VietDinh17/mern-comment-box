const secrets = {
    dbUri: 'mongodb://VietD:quocviet95@ds163354.mlab.com:63354/box-comment'
};
  
export const getSecret = key => secrets[key];