import UserService from '../services/UserService.js';
import {sendVerificationEmail} from '../utils/mailer.js';
import crypto from 'crypto';

const userController = {

  // Créer un utilisateur
register: async(req,res) => {
    try{
        const userData = req.body;

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const userId = await UserService.createUser(userData, req.pool,verificationToken);
        const verificationLink = `http://localhost:5000/verify/${verificationToken}`

        await sendVerificationEmail(userData.email,verificationLink);

        res.status(201).json({success: true, userId});
        }catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
  },

  // Vérification du compte via token
  verify: async (req, res) => {
    try {
      const { token } = req.params;

      const verified = await UserService.verifyUserByToken(token, req.pool);

      if (!verified) {
        return res.status(400).json({ success: false, message: "Token invalide ou expiré" });
      }

      res.status(200).json({ success: true, message: "Compte vérifié avec succès !" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Cherche utilisateur par email
  findByEmail:async(req,res) =>{
    try{
      const {email} = req.query;
      const user = await UserService.findUserByEmail(email, req.pool);
      if(!user) return res.status(404).json({success: false, message: "Utilisateur non trouvé"});
      res.status(200).json({success:true, user})
    } catch (error) {
      res.status(400).json({success:false, message: error.message})
    }
  },

  // Récupérer tous les utilisateurs
  getAll:async(req,res) =>{
    try{
      const users = await UserService.getAllUsers(req.pool);
      res.status(200).json({success: true,users});
    }catch(error) {
      res.status(400).json({success: false, message: error.message});
    }
  },

  // Récupérer un utilisateur par ID
  getById:async(req, res) => {
    try{
      const {id} = req.params;
      const user = await UserService.getUserById(id, req.pool);
      if(!user) return res.status(404).json({success: false,message: "Utilisateur non trouvé"});
      res.status(200).json({success: true,user})
    } catch (error) {
      res.status(400).json({success:false, message: error.message});
    }
  },

  deleteById: async(req,res) => {
    try{
      const {id} = req.params;
      const deleted = await UserService.deleteUserById(id, req.pool);

      if (!deleted) {
        return res.status(404).json({success: true, message:"Utilisateur non trouvé"})
      }
     res.status(200).json({success:true, message: "Utilisateur supprimé avec succés"})
    }catch(error){
      res.status(400).json({success:false, message: error.message});
    }
  },

  deleteAll: async(req,res) => {
    try{
      const deleted = await UserService.deleteAllUsers(req.pool);
      res.status(200).json({success: true,deleted});
    }catch(error){
      res.status(400).json({success: false,message:`${deletedAll} utilisateurs supprimés`});
    }
  },

  updatedById: async (req,res) => {
    try{
      const {id} = req.params;
      const updated = await UserService.updateUserById(id, req.body);

      if(!updated) {
        return res.status(404).json({success:false, message: "Utilisateur non trouvé"});
      }

      res.status(200).json({success: true, message: "Utilisateur modifié avec succès"});
    }catch(error){
      res.status(400).json({success: false, message: error.message});
    }
  }

  };

  export default userController;