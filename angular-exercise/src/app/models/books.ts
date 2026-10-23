export interface ReadingLogResponse {
  page: number;
  reading_log_entries: ReadingLogEntry[];
}

export interface ReadingLogEntry {
  logged_date: string;
  logged_edition: string;
  work: Work;
}

export interface Work {
  author_keys: string[];
  author_names: string[];
  cover_edition_key: string;
  cover_id: number;
  edition_key: string[];
  first_publish_year: number;
  key: string;
  lending_edition_s: string;
  title: string;
}

export interface Books {
  id: number;
  title: string;
  authors: string[];
  coverId: number | null;
  firstPublishYear: number | null;
  loggedDate: string;
}
