import axios from 'axios';

export async function fetchGitHubProfile(username) {
  try {
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);

    return {
      profile: userRes.data,
      repos: reposRes.data.map((repo) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language,
      })),
    };
  } catch (error) {
    console.error('❌ GitHub fetch error:', error.message);
    throw error;
  }
}
