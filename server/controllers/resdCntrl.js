import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createcar = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const car = await prisma.car.create({
      data: {
        title,
        description,
        price,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Car added successfully", car });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A car with address already there");
    }
    throw new Error(err.message);
  }
});

// function to get all the documents/residencies
export const getAllcars = asyncHandler(async (req, res) => {
  const residencies = await prisma.car.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// function to get a specific document/car
export const getcar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const car = await prisma.car.findUnique({
      where: { id },
    });
    res.send(car);
  } catch (err) {
    throw new Error(err.message);
  }
});
