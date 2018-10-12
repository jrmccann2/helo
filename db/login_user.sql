select id, username, profile_pic
from users
where username = $1 AND password = $2;