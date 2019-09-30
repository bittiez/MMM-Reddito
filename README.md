# MMM-Reddito
A plugin for MagicMirror to display posts from a subreddit.

![Reddito](/reddito.png)

# Installation
`cd MagicMirror\modules\` -> `git clone https://github.com/bittiez/MMM-Reddito.git`  
(Navigate to your modules folder in a cmd prompt or terminal, and clone the git repo there.)

# Updating
`cd MagicMirror\Modules\MMM-Reddito\` -> `git pull`

# Config
```
module: 'MMM-Reddito',
position: 'top_left',
config: {
  updateInterval: 120000,
  headerText: "Reddito",
  subreddit: "news",
  sortby: "hot", //hot, new, or top
  showCount: "5", //Max 25
  width: "700px",
}
```
Note: To create multiple instances, just insert this as many times as you would like.
