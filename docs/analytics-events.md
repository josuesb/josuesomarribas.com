# Analytics events

GA4 receives interaction events through `components/AnalyticsTracker.tsx` and the shared `trackEvent` helper. Event payloads intentionally exclude email addresses and other form values.

| Event | Trigger | Useful parameters |
| --- | --- | --- |
| `contact_click` | Email link or copy-email button | `contact_method`, `placement`, `link_text` |
| `project_click` | Homepage project or experiment | `item_name`, `link_url`, `placement` |
| `language_switch` | EN/ES selector | `from_language`, `to_language`, `destination_path` |
| `resume_click` | Résumé link | `link_text`, `placement` |
| `external_profile_click` | LinkedIn link | `platform`, `placement` |
| `article_navigation` | Link to another article | `article_slug`, `placement` |
| `newsletter_submit` | Valid Mailchimp form submission | `placement`, `language` |
| `rss_click` | RSS link | `item_name`, `link_url`, `placement` |
| `audio_start` | First narration play | `article_title`, `language`, `audio_source` |
| `audio_resume` | Narration resumed | `article_title`, `language`, `audio_source` |
| `audio_pause` | Narration paused | `article_title`, `language`, `audio_source`, `audio_time` |
| `audio_progress` | MP3 reaches 25%, 50%, or 75% | `article_title`, `language`, `percent` |
| `audio_complete` | MP3 finishes | `article_title`, `language`, `audio_source` |
| `audio_fallback` | MP3 fails and browser speech takes over | `article_title`, `language`, `failed_source` |

Use GA4 DebugView or Tag Assistant to inspect events in real time. Register parameters as custom dimensions only when they are needed in standard reports; raw event parameters remain available in DebugView and explorations.
