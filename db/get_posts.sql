select p.title, p.img, p.content, u.username, u.profile_pic
from users u
JOIN posts p on u.id = p.author_id;