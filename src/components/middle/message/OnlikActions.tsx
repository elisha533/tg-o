import React, { useState } from '../../../lib/teact/teact';

import type { ApiMessage } from '../../../api/types';
import type { ISendOption } from './helpers/sendContentOptions';

import { getMessageSendToParentWindowOptions } from './helpers/sendContentOptions';

import useLastCallback from '../../../hooks/useLastCallback';

import Button from '../../ui/Button';

type OwnProps = {
  message: ApiMessage;
};

type IOnlikButtonProps = {
  option: ISendOption;
};

export function OnlickActionButton(props: IOnlikButtonProps) {
  const {
    option,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = useLastCallback(() => {
    setIsLoading(true);
    option.handler(() => {
      setIsLoading(false);
      setIsSuccess(true);
    });
  });

  return (
    <Button
      key={option.label}
      size="tiny"
      color={isSuccess ? 'primary' : 'secondary'}
      onClick={handleClick}
      style="width: 32px; height: 32px;"
    >
      {isLoading ? '...' : option.short}
    </Button>
  );
}

export function OnlikActionsButtons(props: OwnProps) {
  const { message } = props;

  const options = getMessageSendToParentWindowOptions(message, true);

  return options.map((option) => (
    <OnlickActionButton option={option} />
  ));
}
