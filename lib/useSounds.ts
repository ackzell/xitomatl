import { Howl } from 'howler';
import { ref } from 'vue';

// Sound Effect by <a href="https://pixabay.com/users/u_edtmwfwu7c-46613712/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=329311">u_edtmwfwu7c</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=329311">Pixabay</a>

export const useSounds = () => {
  const isLoaded = ref(false);

  // Create a sound library
  const sounds = {
    ding: new Howl({ src: ['/sounds/Ding Sound Effect.mp3'] }),
  };

  // Preload all sounds
  const loadSounds = () => {
    const totalSounds = Object.keys(sounds).length;
    let loadedCount = 0;

    Object.values(sounds).forEach((sound) => {
      sound.once('load', () => {
        loadedCount++;
        if (loadedCount === totalSounds) {
          isLoaded.value = true;
        }
      });
    });
  };

  // Play a sound if loaded
  const play = (sound: keyof typeof sounds) => {
    if (sounds[sound]) {
      sounds[sound].play();
    }
  };

  // Initialize sounds (call this in your app.vue or plugin)
  const init = () => {
    loadSounds();
    return { isLoaded, play };
  };

  return {
    init,
    isLoaded,
    play,
  };
};
