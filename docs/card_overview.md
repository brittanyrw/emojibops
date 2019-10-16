## Card Overview

On the website, each `Emoji Card` displays 1) images of the emojis, 2) a hint icon that will show the year the song was released (when the user hovers) and 3) the name of the song, the artist name and a link to the music video (which appears when the user clicks on a card).

![Screenshot of emoji cards](../readme/emojibops-card.png)

In the `data.js` file, each `Emoji Card` consists of the following object:

```
{
  title: "Boy With Luv",
  artist: ["BTS"],
  featuredArtist: ["Halsey"],
  emojiImgs: "🧒🏻💜📸",
  musicVideo: "https://www.youtube.com/watch?v=XsX3ATc3FbA",
  genres: ["k-pop", "pop"],
  year: 2019
}
```

To add a new card to the website, add a new object in the `data.js` file. Make sure to separate your new object from existing objects with a comma. Below is an overview of each key in the `Emoji Card` object. Every key is required.

### Title 👍

Each card must have a title. This should not included featured artist names, that is added seperately so we can filter by those artist names later.

```
{
  title: "Boy With Luv",
}
```

### Emojis 😍

The emojis should be added to `emojiImgs` as a string. Your emojis should be surrounded by double quotation marks.

## **Important Note: Add six emojis maximum for each card**

```
{
  emojiImgs: "🧒🏻💜📸",
}
```

Using JavaScript, the emojis are converted into [Twemoji (Twitter's emoji version)](https://github.com/twitter/twemoji) so that all emojis will be uniform across platforms. And because they are pretty cute. 💖

Here are a few resources to find emojis to copy:

- [Twitter Emojis](https://www.piliapp.com/twitter-symbols/) - Shows you what each Twitter emoji looks like. 
- [Get Emoji](https://getemoji.com/) and [EmojiCopy](https://www.emojicopy.com/) are tools to copy regular emojis easily from one page. Note: The initial homepage does not display all skin color versions of each emoji so you will need to search in Emojipedia for those.
- [Emojipedia](https://emojipedia.org/) - A directory of all emojis.

Note when you copy these emojis and paste them into your text editor or Github, they will no longer look like the Twitter emojis. But don't worry, Javascript will convert them to the Twitter emojis on the EmojiBops website.

### Genres 🔍

The genres should be added as an array (the square [] brackets indicates an array or list). Separate each genre with a comma and each genre should be wrapped in quotes. There is no limit to the number of genres but try not to add too many.

```
{
  genres: ["k-pop", "pop"],
}
```

Select your genres from [this list of genres](https://github.com/brittanyrw/emojibops/blob/master/genres.md). If you want to use a genre that is not on this list, in your pull request please add the genre to the `genres.md` file.

If you need help selecting genres, you can sometimes find genres on the song's Wikipedia page.

### Artist 🎬

The artist(s) should be added as an array (the square [] brackets indicates an array or list). Separate each artist with a comma and each artist should be wrapped in quotes. An example with multiple artists: ```  artist: ["Lady Gaga", "Bradley Cooper"]```

For musicals, the `artist` should be the name of the show.
```
{
  artist: ["BTS"],
}
```

### Featured Artist 🎬

The featured artist(s) should be added as an array (the square [] brackets indicates an array or list). Separate each artist with a comma and each artist should be wrapped in quotes. An example with multiple featured artists: ```  featuredArtist: ["Justin Bieber", "Lil Wayne", "Quavo", "Chance the Rapper"]```

```
{
  featuredArtist: ["Halsey"],
}
```

### Music Video 

Add a link to the official music video if there is one. If there is no music video, then add a link to a performance of the song (such as on an awards show, talk show, etc). If you are not able to find a music video or performance, just try to use your best judgement when selecting a video for the song. If there are no videos, leave this item blank like so: ```musicVideo: ""```

The link must have https or http included.

```
{
  musicVideo: "https://www.youtube.com/watch?v=XsX3ATc3FbA",
}
```

### Year 📆

Specify the year the song was released. 

```
{
  year: 1994
}
```

# Card Pull Request Checklist

Follow the checklist below when working on adding a card. This will help you double check that you have everything you need to have your Pull Request approved.

- [ ] 🔎 Have searched the `data.js` file and `Pull Requests` to make sure that you are not adding a duplicate.
- [ ] 🖍️ Place the song(s) are placed in alphabetical order based on `title` inside of the `data.js` file. 
- [ ] 🖍️ The `artist(s)` and `featured artist(s)` are all inside of square brackets `[ ]` and each are individually wrapped in quotation marks and have a comma between each one. (such as submitting this `"artist": ["Lady Gaga","Bradley Cooper"]` and not this `"genres":["Lady Gaga,Bradley Cooper"]`).
- [ ] 3️⃣ There are at least three emojis listed under `emojiImgs`
- [ ] 6️⃣ There are a maxium of six emojis listed under `emojiImgs`.
- [ ] 🖍️ There is a link to an official music video or performance under `musicVideo`. If there is no official video, I have added an empty string.
- [ ] 👍 The pull request has a descriptive title (such as `Added Boy With Luv` or `Added all of Panic at the Disco songs`)
- [ ] ⭐ The genres are all inside of square brackets `[ ]` and each are individually wrapped in quotation marks and have a comma between each one. (such as submitting this `"genres": ["k-pop","pop","dance"]` and not this `"genres":["k-pop, pop, dance"]`).
- [ ] 📅 There is a single year under `year`. 
