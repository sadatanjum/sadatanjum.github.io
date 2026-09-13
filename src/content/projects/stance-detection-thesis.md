---
title: Stance Detection in Mental Health Discourse
description: Undergraduate thesis — classifying stance in Reddit mental-health conversations using NLP
tags: [NLP, Research, Machine Learning]
headline: Undergraduate thesis — classifying stance in Reddit mental-health conversations
coverImage: /images/projects/stance-detection.png
metrics:
  - "2,500+ labeled posts"
  - "3 stance classes"
  - "F1: 0.72"
github: https://github.com/sadatanjum/stance-detection-thesis
publishDate: "2025-05-10"
featured: true
---

## Context

My undergraduate thesis at BRAC University. The task: build a system that could automatically detect whether a Reddit comment in mental-health communities (r/depression, r/anxiety, r/mentalhealth) supported, opposed, or was neutral toward the preceding post. This is stance detection — a subtask of natural language understanding that's important for detecting polarization, misinformation, and support networks in online discourse.

## The Question

**Can we automatically classify stance in mental-health conversations, and what linguistic features (sentiment, hedging, question-asking) predict support vs. opposition?**

The thesis had two goals: (1) build a working classifier, and (2) interpret what linguistic patterns the model learned — the "why" behind the predictions.

## The Data

**Source:** Reddit Pushshift archive (public dataset), filtered to posts and comments from mental-health communities (r/depression, r/anxiety, r/mentalhealth, r/SuicideWatch).

**Volume:** ~2,500 comment-post pairs, manually annotated with stance labels (Support, Oppose, Neutral).

**Grain:** One row per comment-post pair, with the post text, comment text, and stance label.

**What was wrong with it:**
1. **Class imbalance** — 65% Neutral, 25% Support, 10% Oppose. This is expected (most comments in support communities are neutral or supportive), but it made the Oppose class hard to learn.
2. **Context length** — some posts were 500+ words, others were 2 sentences. The model needed to handle variable-length inputs.
3. **Annotation consistency** — stance is subjective. I recruited 2 annotators besides myself, measured inter-annotator agreement (Cohen's kappa = 0.68), and kept only the pairs where at least 2 annotators agreed.
4. **Noise in text** — Reddit comments have typos, slang, emojis, and nested quotes. Required careful preprocessing.

## Approach

Built a three-stage pipeline: (1) data preprocessing, (2) feature engineering + model training, and (3) interpretability analysis.

1. **Preprocessing:**
   - Removed Reddit-specific noise (username mentions, subreddit links, quoted text)
   - Lowercased, tokenized, and removed stop words (but kept negation words like "not", "don't" — they're important for stance)
   - Applied spell correction using a medical/mental-health custom dictionary

2. **Feature engineering + model:**
   - Started with a simple baseline: TF-IDF + logistic regression
   - Experimented with adding sentiment features (VADER scores), hedging features (presence of "maybe", "I think", "perhaps"), and question-asking (number of question marks, question words)
   - Final model: a fine-tuned BERT-base model, with the post and comment concatenated (post [SEP] comment)
   - Used class weighting to handle the imbalance

3. **Interpretability analysis:**
   - Extracted SHAP values to see which words the model relied on for each class
   - Compared the model's learned features to the hand-crafted features from the baseline

4. **What I rejected and why:**
   - **Zero-shot classification with GPT:** Tempting, but the goal was to learn how to train and interpret a model, not to get the best possible accuracy. Also, GPT's explanations are harder to audit.
   - **Building a custom neural architecture:** BERT-base with fine-tuning was already overkill for this dataset. A custom architecture would have been engineering for its own sake.
   - **Using the full post context:** Some posts were 1,000+ words. BERT has a 512-token limit. I truncated posts to the first 256 tokens, which captured the core message in most cases.

Here's the core model setup (simplified):

```python
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
import torch

class StanceDataset(torch.utils.data.Dataset):
    def __init__(self, posts, comments, labels, tokenizer, max_length=512):
        self.posts = posts
        self.comments = comments
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __getitem__(self, idx):
        post = self.posts[idx]
        comment = self.comments[idx]
        encoding = self.tokenizer(
            post, comment,
            truncation='longest_first',
            max_length=self.max_length,
            padding='max_length',
            return_tensors='pt'
        )
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(self.labels[idx], dtype=torch.long)
        }

    def __len__(self):
        return len(self.labels)

# Load pre-trained BERT and fine-tune
model = BertForSequenceClassification.from_pretrained(
    'bert-base-uncased',
    num_labels=3  # Support, Oppose, Neutral
)
```

## What Changed

**Model performance:**
- **Macro F1: 0.72** (Support: 0.76, Oppose: 0.58, Neutral: 0.82)
- The Oppose class remained the hardest — the signal was subtle, and the class was small.
- BERT outperformed the TF-IDF baseline by 12 points on macro F1.

**Interpretability findings:**
- The model learned that **hedging words** ("maybe", "I think") were associated with Neutral stance, while **direct reassurance** ("you're not alone", "it gets better") was associated with Support.
- **Question-asking** was neutral — the model didn't learn to associate questions with support or opposition.
- The SHAP analysis revealed that the model sometimes relied on post content more than comment content, which was a bug in the data preprocessing (fixed in the final version).

**Thesis outcome:**
- Defended successfully in May 2025.
- The thesis is not yet published, but I plan to submit it to a student workshop or a local NLP conference.

**One honest limitation:** The dataset was small and from only three subreddits. The model would need to be retrained and evaluated on a larger, more diverse dataset before it could be used in production. Also, stance detection in mental-health conversations has ethical implications — automated misclassification could be harmful if used to intervene in real-time.

## Artefacts

- **GitHub:** [Stance Detection Thesis Repository](https://github.com/sadatanjum/stance-detection-thesis) — includes the data preprocessing script, model training code, SHAP analysis, and the thesis PDF
- **Thesis PDF:** Available on request (not yet published)
- **Poster:** Presented at the BRAC University CSE Project Show 2025

*Note: All Reddit data is from public archives. No private messages or identifiable user information is included.*