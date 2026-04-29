import { Star, GitFork, RefreshCw, ExternalLink, User } from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { useState, useEffect } from 'react';
import { github } from '../lib/api';

export default function GithubRepo() {
  const [username, setUsername] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const fetchRepos = async (user) => {
    if (!user.trim()) return;
    setIsSyncing(true);
    setError('');
    try {
      const [profileRes, reposRes] = await Promise.all([
        github.user(user.trim()),
        github.repos(user.trim()),
      ]);
      setProfile(profileRes);
      setRepos(reposRes.repos);
      setUsername(user.trim());
      setLoaded(true);
    } catch (err) {
      setError(err.message || 'Failed to fetch GitHub data');
      setRepos([]);
      setProfile(null);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRepos(inputValue);
  };

  const langColor = (lang) => {
    const map = {
      JavaScript: 'bg-yellow-400 text-yellow-400',
      TypeScript: 'bg-blue-400 text-blue-400',
      Python: 'bg-green-500 text-green-500',
      Rust: 'bg-orange-500 text-orange-500',
      Go: 'bg-cyan-400 text-cyan-400',
      Java: 'bg-red-500 text-red-500',
      'C++': 'bg-pink-500 text-pink-500',
      CSS: 'bg-purple-400 text-purple-400',
      HTML: 'bg-orange-400 text-orange-400',
    };
    return map[lang] || 'bg-gray-400 text-gray-400';
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return 'unknown';
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <GithubIcon className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" size={32} /> Armory (Repositories)
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-2">Search a GitHub username to view their repositories.</p>
        </div>
        {username && (
          <button
            onClick={() => fetchRepos(username)}
            className="game-button bg-[#2ea043] text-white px-5 py-2.5 flex items-center gap-2 rounded-md shadow-[0_0_15px_rgba(46,160,67,0.4)] hover:shadow-[0_0_25px_rgba(46,160,67,0.8)] hover:bg-[#3fb950] transition-all"
          >
            <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
            {isSyncing ? 'Syncing...' : 'Refresh'}
          </button>
        )}
      </div>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
        <div className="relative flex-1">
          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Enter GitHub username..."
            className="w-full bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-[var(--color-neon-blue)] transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={isSyncing || !inputValue.trim()}
          className="game-button px-6 py-3 rounded-xl font-bold disabled:opacity-50 transition-all"
        >
          {isSyncing ? 'Loading...' : 'Search'}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="mb-6 glass-panel p-4 border-red-500/50 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Profile card */}
      {profile && (
        <div className="mb-8 glass-panel p-6 flex items-center gap-6">
          <img src={profile.avatar_url} alt={profile.login} className="w-16 h-16 rounded-full border-2 border-[var(--color-neon-blue)]" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{profile.name || profile.login}</h2>
            <p className="text-[var(--color-text-secondary)] text-sm mt-1">{profile.bio || 'No bio'}</p>
            <div className="flex gap-4 mt-2 text-xs text-gray-400">
              <span>{profile.public_repos} repos</span>
              <span>{profile.followers} followers</span>
              <span>{profile.following} following</span>
            </div>
          </div>
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer"
            className="text-[var(--color-neon-blue)] hover:text-white transition-colors flex items-center gap-1 text-sm">
            <ExternalLink size={16} /> View on GitHub
          </a>
        </div>
      )}

      {/* Repos grid */}
      {repos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo, i) => (
            <div
              key={repo.id}
              className={`glass-panel p-6 border-t-2 border-t-[var(--color-neon-blue)] group hover:border-[var(--color-dark-border)] hover:border-t-[var(--color-neon-purple)] transition-all transform duration-500 ease-out hover:scale-105 hover:z-10 relative overflow-hidden ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-blue)]/5 to-[var(--color-neon-purple)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-[var(--color-neon-blue)] flex items-center gap-2 group-hover:text-[var(--color-neon-purple)] transition-colors cursor-pointer drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                >
                  <ExternalLink size={18} /> {repo.name}
                </a>
                <span className="text-xs bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] px-2 py-1 rounded-full text-gray-400">
                  {repo.private ? 'Private' : 'Public'}
                </span>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] mb-6 relative z-10 line-clamp-2">
                {repo.description || 'No description provided.'}
              </p>

              <div className="flex items-center gap-6 text-sm text-[var(--color-text-secondary)] relative z-10">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full shadow-[0_0_8px_currentColor] ${langColor(repo.language)}`}></div>
                    {repo.language}
                  </div>
                )}
                <div className="flex items-center gap-1 hover:text-[var(--color-neon-blue)] cursor-pointer transition-colors">
                  <Star size={16} /> {repo.stars}
                </div>
                <div className="flex items-center gap-1 hover:text-[var(--color-neon-purple)] cursor-pointer transition-colors">
                  <GitFork size={16} /> {repo.forks}
                </div>
                <div className="text-xs text-gray-500 ml-auto">
                  Updated {timeAgo(repo.updated_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!repos.length && !isSyncing && (
        <div className={`glass-panel p-8 text-center border-dashed border-[var(--color-dark-border)] hover:border-[var(--color-neon-blue)] group transition-all duration-700`}>
          <GithubIcon size={48} className="mx-auto text-gray-600 mb-4 opacity-50 group-hover:text-white group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-neon-blue)] transition-colors">Search a GitHub user</h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Enter a GitHub username above to view their repositories and stats.</p>
        </div>
      )}
    </div>
  );
}
