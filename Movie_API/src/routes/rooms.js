import express from "express";
import RoomController from "../controller/rooms.js"


const roomsRouter = express.Router();

const roomController = new RoomController()
roomsRouter.get("/", roomController.getAllRooms)

roomsRouter.get("/:id", roomController.getRoomDetails)

roomsRouter.post("/", roomController.createRoom)

roomsRouter.put("/:id", roomController.updateRoom)

roomsRouter.delete("/:id", roomController.deleteRoom)

export default roomsRouter;