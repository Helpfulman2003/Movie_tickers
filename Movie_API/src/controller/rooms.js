import Room from '../models/RoomModel.js';

class RoomController {
    async getAllRooms(req, res) {
        try {
            const Rooms = await Room.find();
            res.status(200).json({
                message: "GET ALL RoomS DONE",
                data: Rooms
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
    async getRoomDetails(req, res) {
        try {
            const room = await Room.findById(req.params.id)
            
            if(!room) {
                return res.status(404).json({
                    message: 'Room not found'
                })
            }
            res.status(200).json({
                message: "GET ALL DETAIL DONE",
                data: room
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    async createRoom(req, res) {
        const newRoom = new Room(req.body);
        const saveRoom = await newRoom.save()
        res.status(201).json({
            message: 'create Room successfull',
            data: saveRoom
        })
    }

    async updateRoom(req, res) {
        try {
            const room = await Room.findByIdAndUpdate(req.params.id, req.body);
            if(!room) {
                return res.status(404).json({
                    message: 'Room not found'
                })
            }
            const updateRoom = await Room.findById(req.params.id);
            res.status(200).json({
                message: "UPDATE Room SUCCESFULL",
                data: updateRoom
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    async deleteRoom(req, res) {
        try {
            const room = await Room.findByIdAndDelete(req.params.id);
            if(!room) {
                return res.status(404).json({
                    message: 'Room not found'
                })
            }
            res.status(200).json({
                message: "DELETE Room DONE",
                data: room
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

}

export default RoomController