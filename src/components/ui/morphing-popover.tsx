'use client';

import {
  useState,
  useId,
  useRef,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  MotionConfig,
  motion,
} from 'framer-motion';
import { useClickOutside } from '@/hooks/use-click-outside';
import { cn } from '@/lib/utils';

const TRANSITION = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.4,
};

type MorphingPopoverContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  uniqueId: string;
};

const MorphingPopoverContext =
  createContext<MorphingPopoverContextValue | null>(null);

function usePopoverLogic({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const uniqueId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isOpen = controlledOpen ?? uncontrolledOpen;

  const open = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(true);
    }
    onOpenChange?.(true);
  };

  const close = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
  };

  return { isOpen, open, close, uniqueId };
}

export type MorphingPopoverProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

function MorphingPopover({
  children,
  defaultOpen,
  open,
  onOpenChange,
  className,
}: MorphingPopoverProps) {
  const popoverLogic = usePopoverLogic({ defaultOpen, open, onOpenChange });

  return (
    <MorphingPopoverContext.Provider value={popoverLogic}>
      <MotionConfig transition={TRANSITION}>
        <div className={cn('relative', className)}>
          {children}
        </div>
      </MotionConfig>
    </MorphingPopoverContext.Provider>
  );
}

export type MorphingPopoverTriggerProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function MorphingPopoverTrigger({
  children,
  className,
  onClick,
}: MorphingPopoverTriggerProps) {
  const context = useContext(MorphingPopoverContext);
  if (!context) {
    throw new Error(
      'MorphingPopoverTrigger must be used within MorphingPopover'
    );
  }

  const handleClick = () => {
    context.open();
    onClick?.();
  };

  return (
    <motion.button
      layoutId={`popover-trigger-${context.uniqueId}`}
      className={className}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  );
}

export type MorphingPopoverContentProps = {
  children: React.ReactNode;
  className?: string;
};

function MorphingPopoverContent({
  children,
  className,
}: MorphingPopoverContentProps) {
  const context = useContext(MorphingPopoverContext);
  if (!context)
    throw new Error(
      'MorphingPopoverContent must be used within MorphingPopover'
    );

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, context.close);

  useEffect(() => {
    if (!context.isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') context.close();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [context.isOpen, context.close]);

  return createPortal(
    <AnimatePresence>
      {context.isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={context.close}
          />
          {/* Content */}
          <motion.div
            ref={ref}
            layoutId={`popover-trigger-${context.uniqueId}`}
            className={cn("z-50", className)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export { MorphingPopover, MorphingPopoverTrigger, MorphingPopoverContent };
