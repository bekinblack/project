import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  const onModalClose = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onModalOpen = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Button
          className={cls.links}
          variant={ButtonVariant.CLEAR_INVERTED}
          onClick={onLogout}
        >
          {t('Logout')}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        className={cls.links}
        variant={ButtonVariant.CLEAR_INVERTED}
        onClick={onModalOpen}
      >
        {t('Enter')}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={onModalClose} />
    </div>
  );
}
