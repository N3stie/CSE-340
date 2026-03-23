router.get('/error-test', (req, res) => {
    throw new Error('Test error');
});