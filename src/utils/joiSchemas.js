import Joi from 'joi';

export const signupSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .message('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export const projectSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})

export const editProjectSchema = Joi.object({
    projectId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
});

export const createTaskSchema = Joi.object({
    projectId: Joi.string().required(),
    task: Joi.string().required(),
    status: Joi.string().valid('PENDING', 'COMPLETED').default('PENDING'),
})

export const editTaskSchema = Joi.object({
    taskId: Joi.string().required(),
    task: Joi.string().required(),
    status: Joi.string().valid('PENDING', 'COMPLETED').default('PENDING'),
});



