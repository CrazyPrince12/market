module.exports = (io, socket) => {
    // Join chat room
    socket.on('joinChat', (roomId) => {
        socket.join(roomId);
        console.log(`Joined ${roomId}`);
    });

    // New produit broadcast
    socket.on('newProduit', (produit) => {
        io.emit('newProduit', produit); // To all clients
    });

    // Send msg
    socket.on('sendMessage', (data) => {
        io.to(data.room).emit('message', { ...data, fromMe: true });
        // Save to DB here if needed
    });

    socket.on('disconnect', () => console.log('User left – Peace! ✌️'));
};