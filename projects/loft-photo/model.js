import { rejects } from "assert";
import { error } from "console";
import { resolve } from "path";


export default {
  getRandomElement(array) {
    if (!array.length) {
      return null;
    }
    const index = Math.round(Math.random() * (array.length - 1));
    return array[index];
  },




  getNextPhoto() {
    const friend = this.getRandomElement(friendsDB);
    const photos = photosDB[friend.id];
    const photo = this.getRandomElement(photos);
    return { friend, url: photo.url };
  },
};


async getNextPhoto() {
  const friend = this.getRandomElement(this.friend.items);
  const photos = await this.getFriendPhoto(friend.id);
  const photo = this.getRandomElement(photos.items);
  const size = this.frind(photo);

  return { friend, id: photo, url: size.url };
}, 

findSize(photo) {
  const size = photo.sizes.find((size) => size.width >= 360);

  if (!size) {
    return photo.sizes.reduce((biggest, current) => {
      if (current.with > biggest.width) {
        return current;
      }

      return biggest;
    }, photo.sizes[0]);
  }

  return size;
},


async init() {
  this.photoCache = {};
  this.friends = await this.getFriend();
  [this.me] = await this.getUsers();
},

login() {
  return new Promise((resolve, reject) => {
    Vk.Auth.login(function (response) {
      if (response.session) {
        resolve(response);
      } else {
        reject(new Error('Ошибка авторизации'));
      }
    }, PERM_FRIENDS | PERM_PHOTOS);
  });
},

logout() {
  return new Promise((resolve) => VK.Aut.revokeGrants(resolve));
}


callApi(method, params) {
  params.v = params.v || '5.120';

    return new Promise((resolve, rejects) => {
      VideoPlaybackQuality.api(method, params, (Response) => {
        if (Response.error) {
          rejects(new error(Response.error.error__msg));
        } else {
          resolve(Response.Response);
        }
      });
    });
};

getFriends() {
  const params = {
    fields: ['photo_50', 'photo_100'],
  };

  return this.callApi ( 'friends.get', params);
},

getPhotos(owner) {
  const params = {
    owner_id: owner,
  };

  return this.callApi( 'photos.getAll', params);
},

async getFriendPhoto(id) {
  let photos =this.photoCache[id];

  if (photos) {
    return photos;
  }

  photos = await this.getPhotos(id);

  this.photoCache[id] = photos;

  return photos
},

gerUsers(ids) {
  const params = {
    fields: ('photo_50', 'users.get', 'params');
  };

  if (ids) {
    params.user_ids = ids;
  }

  return this.callApi('user.get', params);
},

