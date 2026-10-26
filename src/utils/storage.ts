import { CareerMatchReport } from '../types';
import { WAYFAIR_INITIAL_REPORT, GOOGLE_SAMPLE_REPORT, STRIPE_SAMPLE_REPORT } from '../data/sampleProfiles';

const STORAGE_KEY = 'careermatch_saved_reports_v2';
const ACTIVE_ID_KEY = 'careermatch_active_report_id_v2';
const MAX_SAVED_REPORTS = 3;

/**
 * Loads the saved reports from localStorage.
 * Automatically initializes with up to 3 realistic reports (Wayfair, Google, Stripe) if empty.
 */
export function loadSavedReports(): CareerMatchReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, MAX_SAVED_REPORTS);
      }
    }
  } catch (err) {
    console.error('Failed to load reports from localStorage', err);
  }

  // Initial seed with 3 high-quality job applications
  const defaultReports = [WAYFAIR_INITIAL_REPORT, GOOGLE_SAMPLE_REPORT, STRIPE_SAMPLE_REPORT];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReports));
    localStorage.setItem(ACTIVE_ID_KEY, defaultReports[0].id);
  } catch (e) {
    console.warn('Could not seed localStorage', e);
  }

  return defaultReports;
}

/**
 * Saves or updates a report in the recent 3 list.
 */
export function saveReportToStorage(report: CareerMatchReport): CareerMatchReport[] {
  try {
    const currentList = loadSavedReports();
    // Filter out any existing report with matching id or exact same company+role
    const filtered = currentList.filter(
      (r) =>
        r.id !== report.id &&
        !(
          r.overview.company.toLowerCase() === report.overview.company.toLowerCase() &&
          r.overview.targetRole.toLowerCase() === report.overview.targetRole.toLowerCase()
        )
    );

    // Add new/updated report at the beginning
    const updated = [report, ...filtered].slice(0, MAX_SAVED_REPORTS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(ACTIVE_ID_KEY, report.id);
    return updated;
  } catch (err) {
    console.error('Failed to save report to localStorage', err);
    return [report];
  }
}

/**
 * Deletes a report by id. If it's the active one, returns a fallback active ID.
 */
export function deleteReportFromStorage(reportId: string): {
  updatedList: CareerMatchReport[];
  nextActiveId: string | null;
} {
  try {
    const currentList = loadSavedReports();
    const updatedList = currentList.filter((r) => r.id !== reportId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    const activeId = localStorage.getItem(ACTIVE_ID_KEY);
    let nextActiveId = activeId;
    if (activeId === reportId) {
      nextActiveId = updatedList.length > 0 ? updatedList[0].id : null;
      if (nextActiveId) {
        localStorage.setItem(ACTIVE_ID_KEY, nextActiveId);
      } else {
        localStorage.removeItem(ACTIVE_ID_KEY);
      }
    }

    return { updatedList, nextActiveId };
  } catch (err) {
    console.error('Failed to delete report from localStorage', err);
    return { updatedList: [], nextActiveId: null };
  }
}

/**
 * Gets the active report ID from storage.
 */
export function getActiveReportId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_ID_KEY);
  } catch {
    return null;
  }
}

/**
 * Sets the active report ID in storage.
 */
export function setActiveReportId(reportId: string): void {
  try {
    localStorage.setItem(ACTIVE_ID_KEY, reportId);
  } catch (err) {
    console.error('Failed to set active report id in localStorage', err);
  }
}
