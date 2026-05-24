import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useFeedPosts, useLikePost, useVoteInPoll, useCreatePost } from '../hooks/useCricketData'

export const Route = createFileRoute('/feed')({ component: Feed })

function Feed() {
  const { data: posts, isLoading } = useFeedPosts()
  const { mutate: likePost, isPending: isLiking } = useLikePost()
  const { mutate: voteInPoll } = useVoteInPoll()
  const { mutate: createPost, isPending: isCreating } = useCreatePost()

  const [newPostContent, setNewPostContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [pollQuestion, setPollQuestion] = useState('')
  const [pollOptions, setPollOptions] = useState(['', ''])
  const [showImageInput, setShowImageInput] = useState(false)
  const [showPollInput, setShowPollInput] = useState(false)

  const hasPollDraft = showPollInput && Boolean(pollQuestion.trim() || pollOptions.some((option) => option.trim()))
  const hasValidPoll =
    !showPollInput || (Boolean(pollQuestion.trim()) && pollOptions.filter((option) => option.trim()).length >= 2)
  const canSubmit = Boolean(newPostContent.trim()) && hasValidPoll && !isCreating

  const resetComposer = () => {
    setNewPostContent('')
    setImageUrl('')
    setPollQuestion('')
    setPollOptions(['', ''])
    setShowImageInput(false)
    setShowPollInput(false)
  }

  const handleSubmitPost = (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    createPost(
      {
        content: newPostContent.trim(),
        image: showImageInput ? imageUrl.trim() : undefined,
        poll: showPollInput
          ? {
              question: pollQuestion.trim(),
              options: pollOptions,
            }
          : undefined,
      },
      {
        onSuccess: resetComposer,
      },
    )
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6 max-w-3xl mx-auto rise-in">
      
      {/* Feed Page Header */}
      <div className="space-y-1">
        <h1 className="font-display font-black text-3xl text-primary tracking-tight">CricHive Social Stream</h1>
        <p className="text-on-surface-variant text-sm">Join discussions with 14k+ pro commentators, players, and expert prediction models.</p>
      </div>

      {/* Discussion Composer */}
      <form 
        onSubmit={handleSubmitPost} 
        className="glass-panel rounded-3xl p-5 border border-white/10 space-y-4 bg-gradient-to-br from-surface-container-low to-surface/40 relative overflow-hidden"
      >
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full border border-primary/20 overflow-hidden flex-shrink-0">
            <img 
              alt="User profile avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtA5hTcX3SQLPzQLmJ7u0jjENR40XNuI_cqbJbCHRXih623sMuWk6ng1WEkjy11DiajJ5el445dwymFx6ouWLk6fb0I3t2Cegb6_kpFZFpJiCcFipVgANiXsGOWw0Uj8gjWrNZtUwUjrkJGuJmFwqprF3RTp1-k3vR2UisWoTDP2cSdWXQiyUlCrDknXy3VYkdNChHWYmA9d-QaMYv1Mz__4sOMMcbsAgAoPN-FNQ3WzMEDx8l0tbMjZKTX3_uyQoNOFT3CppKfGs"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What is your analysis on today's spell? Write post..."
              className="w-full bg-transparent border-none text-primary placeholder-on-surface-variant/60 focus:ring-0 outline-none resize-none min-h-[90px] text-sm custom-scrollbar"
              maxLength={400}
            />
          </div>
        </div>

        {showImageInput && (
          <label className="block">
            <span className="sr-only">Image URL</span>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste an image URL"
              className="w-full rounded-2xl bg-[#05070a] border border-white/10 px-4 py-3 text-sm text-primary placeholder-on-surface-variant/60 outline-none focus:border-electric-blue"
              type="url"
            />
          </label>
        )}

        {showPollInput && (
          <div className="rounded-2xl bg-[#05070a]/70 border border-white/10 p-4 space-y-3">
            <label className="block">
              <span className="sr-only">Poll question</span>
              <input
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                placeholder="Ask a poll question"
                className="w-full bg-transparent border-none text-sm font-semibold text-primary placeholder-on-surface-variant/60 outline-none"
              />
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {pollOptions.map((option, index) => (
                <label key={index} className="block">
                  <span className="sr-only">Poll option {index + 1}</span>
                  <input
                    value={option}
                    onChange={(e) => {
                      const next = [...pollOptions]
                      next[index] = e.target.value
                      setPollOptions(next)
                    }}
                    placeholder={`Option ${index + 1}`}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-primary placeholder-on-surface-variant/60 outline-none focus:border-neon-green"
                  />
                </label>
              ))}
            </div>
            {hasPollDraft && !hasValidPoll && (
              <p className="text-[11px] text-error">Add a poll question and at least two options.</p>
            )}
          </div>
        )}

        <div className="flex justify-between items-center border-t border-white/5 pt-4">
          <div className="flex gap-2 text-on-surface-variant">
            <button
              type="button"
              onClick={() => setShowImageInput((shown) => !shown)}
              className={`material-symbols-outlined p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-[20px] ${showImageInput ? 'text-neon-green bg-white/5' : 'hover:text-neon-green'}`}
              title="Attach image"
            >
              image
            </button>
            <button
              type="button"
              onClick={() => setShowPollInput((shown) => !shown)}
              className={`material-symbols-outlined p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-[20px] ${showPollInput ? 'text-electric-blue bg-white/5' : 'hover:text-electric-blue'}`}
              title="Add poll"
            >
              poll
            </button>
            <button type="button" className="material-symbols-outlined hover:text-neon-green p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-[20px]">emoji_emotions</button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-on-surface-variant/70">{newPostContent.length}/400</span>
            <button 
              type="submit" 
              disabled={!canSubmit}
              className="flex items-center gap-1.5 bg-neon-green text-black font-bold px-4 py-2 rounded-xl text-xs hover:shadow-[0_0_12px_rgba(204,255,0,0.4)] disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-[0.98]"
            >
              {isCreating ? (
                <>
                  <span className="material-symbols-outlined text-xs animate-spin">sync</span>
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xs font-black">send</span>
                  <span>Post Broadcast</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Social Timeline */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-panel rounded-3xl p-6 border border-white/10 animate-pulse space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5" />
                <div className="flex-1 space-y-2">
                  <div className="w-28 h-3 bg-white/10 rounded" />
                  <div className="w-16 h-2 bg-white/5 rounded" />
                </div>
              </div>
              <div className="w-full h-16 bg-white/5 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {posts?.map((post) => (
            <article 
              key={post.id} 
              className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4 bg-gradient-to-br from-surface-container-low/90 to-surface/40 hover:border-primary/20 transition-all duration-300 relative"
            >
              {/* Post Header */}
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <img 
                    alt={post.author} 
                    className="w-10 h-10 rounded-full border border-white/10 object-cover" 
                    src={post.avatar}
                  />
                  <div>
                    <h3 className="font-display font-semibold text-sm text-primary flex items-center gap-1.5">
                      {post.author}
                      {post.isOfficial && (
                        <span 
                          className="material-symbols-outlined text-electric-blue text-[13px]" 
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          title="Verified Broadcaster"
                        >
                          verified
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-on-surface-variant">{post.handle} • {post.time}</p>
                  </div>
                </div>
                
                <button className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer text-md p-1 rounded-lg hover:bg-white/5">
                  more_horiz
                </button>
              </div>

              {/* Post Body Content */}
              <p className="text-sm text-primary leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Optional Post Image */}
              {post.image && (
                <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05070a] max-h-96">
                  <img 
                    alt="Post attachment" 
                    className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-500" 
                    src={post.image}
                  />
                </div>
              )}

              {/* Interactive Poll Component */}
              {post.poll && (
                <div className="bg-[#05070a]/60 border border-white/5 rounded-2xl p-4 md:p-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-neon-green font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">ballot</span>
                    Live Hive Poll
                  </div>
                  <h4 className="font-display font-bold text-sm text-primary">{post.poll.question}</h4>
                  
                  <div className="space-y-2 pt-1">
                    {post.poll.options.map((option, idx) => {
                      const hasVoted = post.poll?.votedIndex !== undefined
                      const isOptionVoted = post.poll?.votedIndex === idx
                      
                      return (
                        <button
                          key={idx}
                          disabled={hasVoted}
                          onClick={() => voteInPoll({ pollId: post.id, optionIndex: idx })}
                          className={`w-full relative overflow-hidden rounded-xl border p-3 flex justify-between items-center transition-all duration-300 text-left ${hasVoted ? 'cursor-default border-white/5 bg-white/[0.01]' : 'cursor-pointer border-white/10 hover:border-primary/30 bg-white/5 hover:bg-white/[0.07] active:scale-[0.99]'}`}
                        >
                          {/* Animated Glass Fill Layer for Percentages */}
                          {hasVoted && (
                            <div 
                              className="absolute inset-y-0 left-0 bg-white/5 transition-all duration-1000 ease-out" 
                              style={{ 
                                width: `${option.percentage}%`,
                                borderLeft: `3px solid ${option.borderLeft}`
                              }}
                            />
                          )}

                          <span className={`relative z-10 text-xs font-semibold ${isOptionVoted ? 'text-primary' : 'text-on-surface-variant'}`}>
                            {option.text}
                          </span>
                          
                          {hasVoted ? (
                            <span className="relative z-10 font-display font-black text-xs text-primary">
                              {option.percentage}%
                            </span>
                          ) : (
                            <span className="material-symbols-outlined text-on-surface-variant text-[15px] opacity-0 hover:opacity-100">
                              check_circle
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                  {post.poll.votedIndex !== undefined && (
                    <p className="text-[10px] text-on-surface-variant/80 text-right">✓ Your anonymous vote has been registered on chain.</p>
                  )}
                </div>
              )}

              {/* Feed Action Bar */}
              <div className="flex justify-between items-center border-t border-white/5 pt-4 text-on-surface-variant">
                <button 
                  onClick={() => likePost(post.id)}
                  disabled={isLiking}
                  className={`flex items-center gap-1.5 cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${post.liked ? 'text-neon-green bg-neon-green/10 font-extrabold' : 'hover:text-neon-green hover:bg-white/5'}`}
                >
                  <span className="material-symbols-outlined text-md" style={{ fontVariationSettings: post.liked ? "'FILL' 1" : undefined }}>
                    thumb_up
                  </span>
                  <span>{post.likes}</span>
                </button>

                <button className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-xl hover:text-electric-blue hover:bg-white/5 transition-all">
                  <span className="material-symbols-outlined text-md">
                    forum
                  </span>
                  <span>{post.comments}</span>
                </button>

                <button className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-xl hover:text-primary hover:bg-white/5 transition-all">
                  <span className="material-symbols-outlined text-md">
                    share
                  </span>
                  <span>{post.shares}</span>
                </button>
              </div>

            </article>
          ))}
        </div>
      )}

    </div>
  )
}
