export const serverURL = 'http://localhost:3001';

export const toastStyle = {
    style: {
        borderRadius: '10px',
        background: '#222',
        color: '#fff',
    },
}

export const responseStrings = {
    invalidEmail: "Invalid e-mail address.",
    success: "Success!",
    invalidURL: "Invalid URL.",
    duplicateURL: "Duplicate URL, please use only unique entries.",

}

export const defaultToastPromiseMessages = {
    loading: 'Loading ...',
    success: (data) => {
        if (data.status === 500) throw new Error('Server error');
        return 'Finished.';
    },
    error: 'Uh oh, there was an error! Please try again.',
}