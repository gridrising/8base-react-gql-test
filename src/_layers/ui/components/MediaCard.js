import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export const MediaCard = ({ title, imageUrl, createdAt }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl || '/templateImage.jpg'}
        alt={title || ''}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title || ''}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {createdAt || ''}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
