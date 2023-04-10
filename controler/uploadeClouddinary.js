
export const uploadImage = async (req, res) => {
    try {
         console.log("123")
        const urls = req.files.map(file => file.path)
        
        if(!urls){
            return res.status(400).json({message:"Upload anh khong thanh cong"})
        }
       
        return res.json({ urls: urls })
    } catch (err) {
        return res.status(400).json({ message: "loi api" })
    }
}