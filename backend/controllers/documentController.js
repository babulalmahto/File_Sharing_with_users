import userModel from "../models/userModel.js";
import documentModel from "../models/documentModel.js";


const documentShareController = async (req, res) => {
    try {
        const { documentId, shareWithUserId } = req.body;


        const document = await documentModel.findById(documentId);
        if (!document) return res.status(404).json({ msg: 'Document not found' });


        if (documentModel.owner.toString() !== req.userId) {
            return res.status(403).json({ msg: 'You are not the owner of this document' });
        }


        const userToShareWith = await userModel.findById(shareWithUserId);
        if (!userToShareWith) return res.status(404).json({ msg: 'User to share with not found' });


        if (!document.sharedWith.includes(shareWithUserId)) {
            document.sharedWith.push(shareWithUserId);
            await document.save();
        }

        res.status(200).json({ msg: 'File shared successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to share the file', error: err });
    }
}

export { documentShareController };