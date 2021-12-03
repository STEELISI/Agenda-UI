export interface Policy {
  reuse: boolean;
  max_transitions: number;
  absolute_accept_thresh: number;
  min_accept_thresh_w_differential: number;
  accept_thresh_differential: number;
  kickoff_thresh: number;
}
