import { rqClient } from '@/shared/api/instance'
import { ROUTES } from '@/shared/model/routes'
import { useNavigate } from 'react-router-dom'

export function useCreateBoard() {
  const navigate = useNavigate()

  const createBoardMutation = rqClient.useMutation('post', '/boards', {
    onSuccess(data) {
      navigate(ROUTES.BOARD.replace(':boardId', data.id))
    },
  })

  const createBoard = () => {
    createBoardMutation.mutate({})
  }

  return {
    createBoard,
    isPending: createBoardMutation.isPending,
    error: createBoardMutation.error,
  }
}