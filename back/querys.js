export const getCustomersQuery = `SELECT * FROM clientes c
                                        JOIN Tipos T on c.tipid = T.tipid
                                        `
export const getTiposQuery = "SELECT * FROM tipos";