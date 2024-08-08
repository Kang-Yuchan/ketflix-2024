'use client';

import { useState } from 'react';
import { Todo } from '@/types/types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendPlaneIcon } from '@/components/icons/send-plane-icon';
import { FilePenIcon } from '@/components/icons/file-pen-icon';
import { TrashIcon } from '@/components/icons/trash-icon';

type Props = {
  todo: Todo;
  isTextMode: boolean;
  onChangeCheck: (id: number, is_complete: boolean) => void;
  onClickSendTask: (id: number, task: string) => void;
  onClickDelete: (id: number) => void;
};

const TodoCard = ({
  todo,
  isTextMode = true,
  onChangeCheck,
  onClickSendTask,
  onClickDelete,
}: Props) => {
  const [isTextModeState, setIsTextModeState] = useState(isTextMode);
  const [inputText, setInputText] = useState(todo.task);
  const [checked, setChecked] = useState(todo.is_complete);

  const handleCheckboxChange = async () => {
    const newCheck = !checked;
    setChecked(newCheck);
    onChangeCheck(todo.id, newCheck);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex w-full items-center gap-2">
          {isTextModeState ? (
            <>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
              />
              <p className="text-sm font-medium">{todo.task}</p>
            </>
          ) : (
            <Input
              className="w-full text-sm font-medium"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          {isTextModeState ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsTextModeState(!isTextModeState)}
            >
              <FilePenIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => onClickSendTask(todo.id, inputText)}
            >
              <SendPlaneIcon className="h-4 w-4 dark:fill-white" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => onClickDelete(todo.id)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TodoCard;
