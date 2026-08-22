Daily Digest Cost Estimate
=========================

Tokens per beat (from real run):
  - Tokens read (est.): ~0
    * Estimated by counting characters in prompt/response and dividing by ~4.
    * In this local run, the TODO file is small (~0 characters read).
    * In a real opencode integration, this would capture prompt token counts.
  - Tokens written (est.): ~25
    * Estimated by counting output characters and dividing by ~4.
    * Each beat writes log entries of roughly 100 characters => ~25 tokens.

Loop cadence: once daily (existing cron schedule runs the digest every day)

Beats per month: ~30 (rough approximation for a monthly total)

Total monthly tokens = tokens per beat * beats per month
  = (~25 written tokens per beat) * (~30 beats per month)
  = ~750 tokens per month

Important: This is a ROUGH ESTIMATE, not exact billing.
- Token counts are approximated by character-count / 4, which is a rough
  heuristic that varies by content type.
- Actual billing depends on the specific AI model used, its token pricing,
  and the exact prompts/responses generated each beat.
- The "beats per month" of 30 is a rounding; actual months vary between 28-31.
- This estimate assumes consistent daily execution; missed runs or variable
  beat output will change the actual total.