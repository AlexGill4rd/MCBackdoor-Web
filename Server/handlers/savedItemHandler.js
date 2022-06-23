module.exports = (io) => {
    const newSavedItem = function (item) {
        /**
         * Item JSON:
         * - item.Servername
         * - item.Player
         * - item.Itemstack
         */
        let slqGetLength = 'SELECT COUNT(id) AS id_count FROM saveditems';
        connection.query(slqGetLength ,(error, results) => {
            if (error) throw error;
            var counter = JSON.parse(JSON.stringify(results))[0].id_count;
            let sqlInsert = 'INSERT INTO saveditems (id, Servername, Itemstack, Player, Datum) VALUES (?,?,?,?,CURRENT_TIMESTAMP)';
            connection.query(sqlInsert, [counter, item.Servername, JSON.stringify(item.Itemstack), JSON.stringify(item.Player)],(error, results) => {
                if (error) throw error;
                io.emit(`saveditem:added`, item)
            }); 
        }); 
    }
    const savedItemList = function (callback) {
        let slqGetLength = 'SELECT * FROM saveditems SORT BY datum DESC';
        connection.query(slqGetLength ,(error, results) => {
            if (error) throw error;
            callback(results);
        }); 
    }
    const savedItemAction = function (item) {
        switch (item.Type){
            case "remove":
                var sqlDelete = 'DELETE FROM saveditems WHERE id = ?';
                connection.query(sqlDelete, [item.id],(error) => {
                    if (error) throw error;
                    io.emit(`saveditem:removed`, item);
                }); 
                break;
            case "edit":
                var sqlInsert = 'UPDATE saveditems SET Itemstack=? WHERE id=?';
                connection.query(sqlInsert, [JSON.stringify(data.Itemstack), data.id] ,(error, results) => {
                    if (error) throw error;
                    io.emit(`saveditem:updated`, [item.id, item]);
                }); 
                break;
            case "give":
                io.emit("server:features-change-" + item.Servername, item);
                break;
        }  
    }
    return {
        newSavedItem,
        savedItemList,
        savedItemAction
    }
}