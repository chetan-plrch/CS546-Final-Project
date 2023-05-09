// Holds roles of system users
export const roles = {
    SEEKER: 'seeker',
    LISTENER: 'listener',
};

export const expertFilterOptions = [
    {
        id: 1,
        label: 'Connected'
    },
    {
        id: 2,
        label: 'Not Connected'
    },
];

export const viewFooterOnPages = ['home', 'feedbackslist', 'experts', 'profile'];

export const feedbackTriggerCount = 5;

export const errorType = {
    BAD_INPUT: 'BAD_INPUT',
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND'
};

export const feedInteractions = {
    like: 'LIKE',
    comment: 'COMMENT',
    save: 'SAVE'
};
