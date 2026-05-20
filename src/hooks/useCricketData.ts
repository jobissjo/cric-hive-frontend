import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockApi } from '../services/mockApi'

// Query keys for caching
export const cricketQueryKeys = {
  liveMatch: ['cricket', 'liveMatch'] as const,
  commentary: ['cricket', 'commentary'] as const,
  feedPosts: ['cricket', 'feedPosts'] as const,
  predictions: ['cricket', 'predictions'] as const,
}

// Queries
export function useLiveMatch() {
  return useQuery({
    queryKey: cricketQueryKeys.liveMatch,
    queryFn: () => mockApi.getLiveMatch(),
    refetchInterval: 15000, // Auto-update live scores every 15 seconds!
  })
}

export function useCommentaries() {
  return useQuery({
    queryKey: cricketQueryKeys.commentary,
    queryFn: () => mockApi.getCommentaries(),
    refetchInterval: 10000, // commentary updates every 10 seconds!
  })
}

export function useFeedPosts() {
  return useQuery({
    queryKey: cricketQueryKeys.feedPosts,
    queryFn: () => mockApi.getFeedPosts(),
  })
}

export function usePredictions() {
  return useQuery({
    queryKey: cricketQueryKeys.predictions,
    queryFn: () => mockApi.getPredictions(),
  })
}

// Mutations
export function useLikePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: string) => mockApi.likePost(postId),
    onSuccess: (updatedPosts) => {
      queryClient.setQueryData(cricketQueryKeys.feedPosts, updatedPosts)
    },
  })
}

export function useVoteInPoll() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ pollId, optionIndex }: { pollId: string; optionIndex: number }) =>
      mockApi.voteInPoll(pollId, optionIndex),
    onSuccess: (updatedPosts) => {
      queryClient.setQueryData(cricketQueryKeys.feedPosts, updatedPosts)
    },
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (content: string) => mockApi.createPost(content),
    onSuccess: (updatedPosts) => {
      queryClient.setQueryData(cricketQueryKeys.feedPosts, updatedPosts)
    },
  })
}
