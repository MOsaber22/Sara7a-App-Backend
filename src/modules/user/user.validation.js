import joi from "joi"
import { globalFields } from "../../middleware/validation.middleware.js"

export const updateProfile = {
    body: joi.object({
        userName: globalFields.userName,
        gender: joi.string().valid("male", "female"),
        phone: globalFields.phone,
        DOB: joi.date().less("now")
    }).required()
}

export const updatePassword = {
    body: joi.object({
        oldPassword: globalFields.password.required(),
        password: globalFields.password.not(joi.ref("oldPassword")).required(),
        confirmPassword: joi.string().valid(joi.ref("password")).required(),
    }).required()
}

export const shareProfile = {
    params: joi.object({
        userId: globalFields.id.required()
    }).required()
}

export const deactivationVerify = {
    body: joi.object({
        otp: globalFields.otp.required()
    }).required()
}

export const reactivationRequest = {
    body: joi.object({
        email: globalFields.email.required()
    }).required()
}

export const reactivationVerify = {
    body: joi.object({
        otp: globalFields.otp.required(),
        email: globalFields.email.required()
    }).required()
}