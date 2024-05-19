import pages from './pages';
import model from './model';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {},

  handleEvents() {
    let startFrom;

    document.querySelector('.component-photo').addEventListener('touchstatr', (e) => {
        const direction = {y: e.changedTouches[0].pageY};
    });

    document.querySelector('.component-photo').addEventListener('touchstart', (e) => {
        const direction = e.changedTouches[0].pageY - startFrom.y;

        if (direction < 0) {
            await this.getNextPhoto();
        }
    });
  };
},

