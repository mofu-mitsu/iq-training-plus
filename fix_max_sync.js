const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const oldSync = `        const data = await getUserData(currentUser.uid);
        if (data) {
          useStore.setState({
            xp: data.xp !== undefined ? data.xp : useStore.getState().xp,
            level: data.level !== undefined ? data.level : useStore.getState().level,
            dailyStreak: data.dailyStreak !== undefined ? data.dailyStreak : useStore.getState().dailyStreak,
            highScores: data.highScores !== undefined ? data.highScores : useStore.getState().highScores,
          });
        }`;

const newSync = `        const data = await getUserData(currentUser.uid);
        if (data) {
          const localState = useStore.getState();
          
          // Merge high scores by taking the maximum for each game
          const mergedHighScores = { ...localState.highScores };
          if (data.highScores) {
            Object.keys(data.highScores).forEach(key => {
              if (!mergedHighScores[key] || data.highScores[key] > mergedHighScores[key]) {
                mergedHighScores[key] = data.highScores[key];
              }
            });
          }

          useStore.setState({
            xp: Math.max(data.xp || 0, localState.xp),
            level: Math.max(data.level || 1, localState.level),
            dailyStreak: Math.max(data.dailyStreak || 0, localState.dailyStreak),
            highScores: mergedHighScores,
          });
        }`;

code = code.replace(oldSync, newSync);
fs.writeFileSync('app/page.tsx', code);
