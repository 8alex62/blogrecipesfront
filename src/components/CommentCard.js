import { Box, Card, Rating, Typography } from "@mui/material";

function CommentCard({comment}){

    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };
    return (
        <Card>
            <Box sx={{alignItems: "center"}}>
                <Typography sx={{ m: 2 }} variant="h6" component="h2">
                    {comment?.author}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                    <Rating value={comment.note} readOnly size="large" precision={0.5} />
                    <Box sx={{ m: 2 }}>{labels[comment.note]}</Box>
                </Box>
            </Box>

            <Typography variant="body1" component="p" sx={{ padding: 2 }}>
                {comment.content}
            </Typography>
            
            <Typography variant="caption" component="p" sx={{ padding: 2, color: "gray" }}>
                {new Date(comment.creationDate).toLocaleDateString()}
            </Typography>
        </Card>
    )
}

export default CommentCard;