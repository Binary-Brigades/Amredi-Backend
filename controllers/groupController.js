const Group = require("../models/groupModel");

exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const createdBy = req.payload.aud;
    const checkUser = await User.findById(createdBy);

    if (!checkUser) {
      return res
        .status(400)
        .json({ success: false, error: "User does not exist" });
    }

    const checkGroup = await Group.findOne({ name });
    if (checkGroup) {
      return res
        .status(400)
        .json({ success: false, error: "Group already exists" });
    }
    const newGroup = await Group.create({ name, createdBy });
    res.status(201).json({ success: true, data: newGroup });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addMemberToGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const memberId = req.payload.aud;
    const { role } = req.body;

    // If role is not provided, default to "member"
    const newMember = { userId: memberId, role: role || "member" };

    const group = await Group.findByIdAndUpdate(
      groupId,
      { $push: { members: newMember } },
      { new: true }
    );

    res.status(200).json({ success: true, data: group });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
