import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SummaryCards } from './SummaryCards';
import type { Summary } from '../types';

describe('SummaryCards', () => {
  const baseSummary: Summary = {
    totalTasks: 5,
    completedTasks: 2,
    unreadMessages: 3,
    urgencyLevel: 'urgent',
  };

  it('renders all four summary values', () => {
    render(<SummaryCards summary={baseSummary} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('urgent')).toBeInTheDocument();
  });

  it('renders correct labels for each card', () => {
    render(<SummaryCards summary={baseSummary} />);

    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
    expect(screen.getByText('Unread Messages')).toBeInTheDocument();
    expect(screen.getByText('Urgency Level')).toBeInTheDocument();
  });

  it('applies rose/red styling for urgent urgency level', () => {
    render(<SummaryCards summary={baseSummary} />);

    const urgencyText = screen.getByText('urgent');
    expect(urgencyText.className).toContain('text-rose-700');
  });

  it('applies emerald/green styling for low urgency level', () => {
    const lowSummary: Summary = {
      ...baseSummary,
      urgencyLevel: 'low',
    };
    render(<SummaryCards summary={lowSummary} />);

    const urgencyText = screen.getByText('low');
    expect(urgencyText.className).toContain('text-emerald-700');
  });

  it('renders different values when summary changes', () => {
    const differentSummary: Summary = {
      totalTasks: 12,
      completedTasks: 8,
      unreadMessages: 0,
      urgencyLevel: 'medium',
    };
    render(<SummaryCards summary={differentSummary} />);

    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
  });
});
