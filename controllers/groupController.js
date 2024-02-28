const Group = require("../models/groupModel");
const { userModel } = require("../models/userModel");
exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const createdBy = req.payload.aud; // Trainer's ID
    const checkGroup = await Group.findOne({ name });

    if (checkGroup) {
      return res
        .status(400)
        .json({ success: false, error: "Group already exists" });
    }

    const newGroup = await Group.create({ name, createdBy });

    // Add the trainer as an admin to the group
    newGroup.members.push({ userId: createdBy, role: "admin" });
    await newGroup.save();

    res.status(201).json({ success: true, data: newGroup });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addMemberToGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const memberId = req.payload.aud; // Member's ID
    const { role } = req.body;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ success: false, error: "Group not found" });
    }

    // Check if the member is already in the group
    const existingMember = group.members.find((member) =>
      member.userId.equals(memberId)
    );
    if (existingMember) {
      return res
        .status(400)
        .json({ success: false, error: "Member already exists in the group" });
    }

    // Add the member to the group with their role
    group.members.push({ userId: memberId, role: role || "member" });
    await group.save();

    res.status(200).json({ success: true, data: group });
  } catch (error) {
    console.log(error);
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

