const STORAGE_KEYS = {
  answers: "cctv_user_answers",
  result: "cctv_user_result"
};

// URL του Google Apps Script Web App. Συμπλήρωσέ το στο config.js.
const ONLINE_API_URL = window.CCTV_ONLINE_API_URL || "";

const questionnaires = {
  beginner: {
    title: "Ερωτήσεις για αρχική εξοικείωση",
    description:
      "Αυτή η διαδρομή είναι πιο εισαγωγική και εστιάζει στην πρώτη επαφή με το θέμα των CCTV.",
    questions: [
      {
        title: "Όταν βλέπεις κάμερες σε έναν χώρο, ποια είναι συνήθως η πρώτη σου σκέψη;",
        options: [
          "Νιώθω μεγαλύτερη ασφάλεια.",
          "Εξαρτάται από τον χώρο και τη χρήση τους.",
          "Νιώθω επιφυλακτικότητα λόγω ιδιωτικότητας."
        ]
      },
      {
        title: "Θεωρείς ότι τα CCTV μπορούν να βοηθήσουν πραγματικά στην προστασία ενός χώρου;",
        options: [
          "Ναι, σε μεγάλο βαθμό.",
          "Ναι, αλλά μόνο μαζί με σωστό σχεδιασμό και ανθρώπινη επίβλεψη.",
          "Όχι ιδιαίτερα."
        ]
      },
      {
        title: "Πόσο σημαντικό θεωρείς να ενημερώνεται ο κόσμος ότι ένας χώρος βιντεοπαρακολουθείται;",
        options: [
          "Είναι απολύτως απαραίτητο.",
          "Είναι σημαντικό, αλλά όχι το μόνο που μετρά.",
          "Δεν το θεωρώ ιδιαίτερα σημαντικό."
        ]
      },
      {
        title: "Ποιος είναι για εσένα ο μεγαλύτερος κίνδυνος από τη χρήση CCTV;",
        options: [
          "Η παραβίαση της ιδιωτικότητας.",
          "Η κακή διαχείριση ή διαρροή του καταγεγραμμένου υλικού.",
          "Η υπερβολική εμπιστοσύνη στην τεχνολογία."
        ]
      },
      {
        title: "Πιστεύεις ότι οι κάμερες πρέπει να τοποθετούνται όπου είναι τεχνικά δυνατό;",
        options: [
          "Ναι, αρκεί να βοηθούν στην ασφάλεια.",
          "Μόνο όπου υπάρχει σαφής ανάγκη και όρια στη χρήση τους.",
          "Όχι, γιατί συχνά ξεπερνούν το αναγκαίο μέτρο."
        ]
      }
    ]
  },

  intermediate: {
    title: "Ερωτήσεις για βασική γνώση",
    description:
      "Αυτή η διαδρομή εστιάζει περισσότερο στη στάθμιση ανάμεσα στην ασφάλεια, την αναγκαιότητα και την ιδιωτικότητα.",
    questions: [
      {
        title: "Πότε θεωρείς ότι η εγκατάσταση CCTV είναι περισσότερο δικαιολογημένη;",
        options: [
          "Όταν υπάρχει σαφής ανάγκη προστασίας προσώπων ή αγαθών.",
          "Σχεδόν σε κάθε επαγγελματικό χώρο.",
          "Μόνο σε πολύ ειδικές περιπτώσεις."
        ]
      },
      {
        title: "Ποιο στοιχείο θεωρείς πιο σημαντικό σε ένα σύστημα CCTV;",
        options: [
          "Η σωστή τοποθέτηση και κάλυψη του αναγκαίου χώρου.",
          "Η υψηλότερη δυνατή τεχνική ποιότητα εικόνας.",
          "Η δυνατότητα συνεχούς παρακολούθησης όλων των σημείων."
        ]
      },
      {
        title: "Πώς βλέπεις τη σχέση μεταξύ ασφάλειας και ιδιωτικότητας;",
        options: [
          "Πρέπει να υπάρχει σαφής ισορροπία ανάμεσά τους.",
          "Η ασφάλεια προηγείται στις περισσότερες περιπτώσεις.",
          "Η ιδιωτικότητα πρέπει σχεδόν πάντα να προηγείται."
        ]
      },
      {
        title: "Πόσο σημαντική θεωρείς τη σωστή ενημέρωση για τη λειτουργία CCTV σε έναν χώρο;",
        options: [
          "Είναι βασικό μέρος της υπεύθυνης χρήσης.",
          "Είναι χρήσιμη, αλλά όχι πάντα καθοριστική.",
          "Δεν επηρεάζει ουσιαστικά τη χρήση του συστήματος."
        ]
      },
      {
        title: "Τι θεωρείς πιο προβληματικό στη χρήση CCTV;",
        options: [
          "Την υπερβολική ή αδικαιολόγητη επιτήρηση.",
          "Την κακή τεχνική εγκατάσταση.",
          "Την εσφαλμένη αίσθηση ότι οι κάμερες λύνουν τα πάντα."
        ]
      }
    ]
  },

  advanced: {
    title: "Ερωτήσεις για πρακτική ή επαγγελματική εμπειρία",
    description:
      "Αυτή η διαδρομή αφορά όσους έχουν πιο άμεση ή επαγγελματική επαφή με συστήματα CCTV.",
    questions: [
      {
        title: "Ποιο θεωρείς ότι είναι το πρώτο βήμα πριν από την εγκατάσταση ενός συστήματος CCTV;",
        options: [
          "Ο σαφής προσδιορισμός του σκοπού και των αναγκών του χώρου.",
          "Η επιλογή εξοπλισμού με βάση τη μέγιστη τεχνική απόδοση.",
          "Η κάλυψη όσο το δυνατόν περισσότερων σημείων."
        ]
      },
      {
        title: "Πώς αξιολογείς τη σωστή κάλυψη ενός χώρου από κάμερες;",
        options: [
          "Με βάση την αναγκαιότητα και την αναλογικότητα της επιτήρησης.",
          "Με βάση το πόσο πλήρης είναι η εικόνα του χώρου.",
          "Με βάση το αν αποφεύγονται τελείως τα τυφλά σημεία, ανεξάρτητα από το πλαίσιο."
        ]
      },
      {
        title: "Τι θεωρείς πιο σημαντικό στη διαχείριση του καταγεγραμμένου υλικού;",
        options: [
          "Περιορισμένη πρόσβαση και υπεύθυνη διατήρηση.",
          "Εύκολη και γρήγορη πρόσβαση από πολλούς χειριστές.",
          "Μεγάλη διάρκεια αποθήκευσης για κάθε ενδεχόμενο."
        ]
      },
      {
        title: "Ποιο είναι το πιο συχνό λάθος στη χρήση CCTV σε έναν χώρο;",
        options: [
          "Η αντίληψη ότι η τεχνολογία αρκεί χωρίς σωστή οργάνωση και πολιτική χρήσης.",
          "Η επιλογή καμερών με χαμηλότερα τεχνικά χαρακτηριστικά.",
          "Η απουσία συνεχούς παρακολούθησης σε κάθε χρονική στιγμή."
        ]
      },
      {
        title: "Ποιο στοιχείο δείχνει περισσότερο υπεύθυνη χρήση ενός συστήματος CCTV;",
        options: [
          "Σαφής σκοπός, ενημέρωση, έλεγχος πρόσβασης και περιορισμένη χρήση του υλικού.",
          "Εκτεταμένη κάλυψη για προληπτικούς λόγους.",
          "Διατήρηση του υλικού για όσο μεγαλύτερο διάστημα γίνεται."
        ]
      }
    ]
  }
};

const scoringMap = {
  beginner: [
    [
      { security: 2, privacy: 0, balanced: 0 },
      { security: 1, privacy: 1, balanced: 2 },
      { security: 0, privacy: 2, balanced: 0 }
    ],
    [
      { security: 2, privacy: 0, balanced: 0 },
      { security: 1, privacy: 1, balanced: 2 },
      { security: 0, privacy: 1, balanced: 0 }
    ],
    [
      { security: 0, privacy: 2, balanced: 1 },
      { security: 1, privacy: 1, balanced: 2 },
      { security: 1, privacy: 0, balanced: 0 }
    ],
    [
      { security: 0, privacy: 2, balanced: 1 },
      { security: 1, privacy: 1, balanced: 2 },
      { security: 1, privacy: 1, balanced: 1 }
    ],
    [
      { security: 2, privacy: 0, balanced: 0 },
      { security: 1, privacy: 1, balanced: 2 },
      { security: 0, privacy: 2, balanced: 1 }
    ]
  ],
  intermediate: [
    [
      { security: 2, privacy: 1, balanced: 2 },
      { security: 2, privacy: 0, balanced: 0 },
      { security: 0, privacy: 2, balanced: 1 }
    ],
    [
      { security: 1, privacy: 1, balanced: 2 },
      { security: 1, privacy: 0, balanced: 0 },
      { security: 2, privacy: 0, balanced: 0 }
    ],
    [
      { security: 1, privacy: 1, balanced: 2 },
      { security: 2, privacy: 0, balanced: 0 },
      { security: 0, privacy: 2, balanced: 0 }
    ],
    [
      { security: 1, privacy: 2, balanced: 2 },
      { security: 1, privacy: 1, balanced: 1 },
      { security: 1, privacy: 0, balanced: 0 }
    ],
    [
      { security: 0, privacy: 2, balanced: 1 },
      { security: 1, privacy: 0, balanced: 1 },
      { security: 1, privacy: 1, balanced: 2 }
    ]
  ],
  advanced: [
    [
      { security: 1, privacy: 1, balanced: 2 },
      { security: 1, privacy: 0, balanced: 0 },
      { security: 2, privacy: 0, balanced: 0 }
    ],
    [
      { security: 1, privacy: 2, balanced: 2 },
      { security: 2, privacy: 0, balanced: 0 },
      { security: 2, privacy: 0, balanced: 0 }
    ],
    [
      { security: 1, privacy: 2, balanced: 2 },
      { security: 1, privacy: 0, balanced: 0 },
      { security: 2, privacy: 0, balanced: 0 }
    ],
    [
      { security: 1, privacy: 1, balanced: 2 },
      { security: 1, privacy: 0, balanced: 0 },
      { security: 2, privacy: 0, balanced: 0 }
    ],
    [
      { security: 1, privacy: 2, balanced: 2 },
      { security: 2, privacy: 0, balanced: 0 },
      { security: 1, privacy: 0, balanced: 0 }
    ]
  ]
};

function getSelectedProfileKey() {
  const params = new URLSearchParams(window.location.search);
  return params.get("profile");
}

function createOptionMarkup(questionIndex, optionText, optionIndex) {
  const safeText = escapeHtml(optionText);

  return `
    <label class="option-item">
      <input type="radio" name="q${questionIndex + 1}" value="${optionIndex + 1}" required />
      <span>${safeText}</span>
    </label>
  `;
}

function createQuestionMarkup(question, index) {
  const optionsMarkup = question.options
    .map((option, optionIndex) => createOptionMarkup(index, option, optionIndex))
    .join("");

  return `
    <article class="question-card">
      <p class="question-step">Ερώτηση ${index + 1}</p>
      <h3>${escapeHtml(question.title)}</h3>
      <div class="question-options">
        ${optionsMarkup}
      </div>
    </article>
  `;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderMissingProfileState(profileTitle, profileDescription, questionsWrapper, questionsForm) {
  profileTitle.textContent = "Δεν έχει επιλεγεί προφίλ";
  profileDescription.textContent =
    "Επίλεξε πρώτα μία κατηγορία από τη σελίδα προφίλ για να συνεχίσεις.";

  questionsWrapper.innerHTML = `
    <article class="question-card">
      <p class="question-step">Προσοχή</p>
      <h3>Δεν βρέθηκε ενεργό προφίλ.</h3>
      <div class="callout-center questions-submit">
        <a class="button" href="profiles.html">Μετάβαση στα προφίλ</a>
      </div>
    </article>
  `;

  questionsForm.classList.add("hidden");
}

function validateAnswers(totalQuestions) {
  for (let index = 1; index <= totalQuestions; index += 1) {
    const checkedInput = document.querySelector(`input[name="q${index}"]:checked`);
    if (!checkedInput) {
      return false;
    }
  }

  return true;
}

function collectAnswers(totalQuestions) {
  const answers = [];

  for (let index = 1; index <= totalQuestions; index += 1) {
    const checkedInput = document.querySelector(`input[name="q${index}"]:checked`);
    answers.push(Number(checkedInput.value));
  }

  return answers;
}

function saveAnswers(profileKey, answers) {
  localStorage.setItem(
    STORAGE_KEYS.answers,
    JSON.stringify({
      profile: profileKey,
      answers
    })
  );
}

function submitViaGoogleSheet(profileKey, answers, result) {
  return new Promise((resolve) => {
    if (!ONLINE_API_URL) {
      resolve({ saved: false, reason: "not-configured" });
      return;
    }

    const frameName = `cctv-submit-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement("iframe");
    iframe.name = frameName;
    iframe.title = "Αποστολή απάντησης";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = ONLINE_API_URL;
    form.target = frameName;
    form.style.display = "none";

    const fields = {
      profile: profileKey,
      answers: JSON.stringify(answers),
      resultType: result.type
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    // Το Apps Script δεν χρειάζεται να επιστρέψει δεδομένα στον browser.
    // Η υποβολή θεωρείται επιτυχής αφού στάλθηκε η φόρμα.
    setTimeout(() => {
      form.remove();
      iframe.remove();
      resolve({ saved: true });
    }, 900);
  });
}

function loadOnlineStatistics(profileKey = null) {
  return new Promise((resolve, reject) => {
    if (!ONLINE_API_URL) {
      reject(new Error("Δεν έχει ρυθμιστεί το online API."));
      return;
    }

    const action = profileKey ? "profileStatistics" : "statistics";
    const callbackName = `cctvStats_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    let finished = false;

    const cleanup = () => {
      clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    };

    const finish = (error, data) => {
      if (finished) return;
      finished = true;
      cleanup();
      error ? reject(error) : resolve(data);
    };

    window[callbackName] = (data) => {
      if (!data || typeof data !== "object") {
        finish(new Error("Μη έγκυρα δεδομένα από το Google Apps Script."));
        return;
      }

      if (profileKey) {
        if (typeof data.total !== "number" || !Array.isArray(data.questions)) {
          finish(new Error("Μη έγκυρα στατιστικά προφίλ."));
          return;
        }
      } else if (typeof data.total !== "number" || !data.profiles) {
        finish(new Error("Μη έγκυρα συνολικά στατιστικά."));
        return;
      }

      finish(null, data);
    };

    script.onerror = () => {
      finish(new Error("Δεν ήταν δυνατή η φόρτωση των στατιστικών."));
    };

    const timeout = setTimeout(() => {
      finish(new Error("Η φόρτωση των στατιστικών άργησε περισσότερο από το αναμενόμενο."));
    }, 8000);

    const separator = ONLINE_API_URL.includes("?") ? "&" : "?";
    let url = `${ONLINE_API_URL}${separator}action=${action}&callback=${encodeURIComponent(callbackName)}&t=${Date.now()}`;
    if (profileKey) {
      url += `&profile=${encodeURIComponent(profileKey)}`;
    }

    script.async = true;
    script.src = url;
    document.head.appendChild(script);
  });
}

function evaluateAnswers(profileKey, answers) {
  const totals = {
    security: 0,
    privacy: 0,
    balanced: 0
  };

  answers.forEach((answerValue, questionIndex) => {
    const optionScores = scoringMap[profileKey][questionIndex][answerValue - 1];
    totals.security += optionScores.security;
    totals.privacy += optionScores.privacy;
    totals.balanced += optionScores.balanced;
  });

  if (totals.security > totals.privacy && totals.security > totals.balanced) {
    return {
      type: "security",
      title: "Δίνεις μεγαλύτερη έμφαση στην ασφάλεια.",
      text:
        "Οι απαντήσεις σου δείχνουν ότι βλέπεις θετικά τη χρήση CCTV όταν αυτά συνδέονται με την προστασία ανθρώπων και χώρων. Παράλληλα, έχει αξία να εξετάζονται και τα όρια χρήσης τους ώστε η εφαρμογή τους να παραμένει υπεύθυνη."
    };
  }

  if (totals.privacy > totals.security && totals.privacy > totals.balanced) {
    return {
      type: "privacy",
      title: "Σε απασχολούν περισσότερο τα όρια και η ιδιωτικότητα.",
      text:
        "Οι απαντήσεις σου δείχνουν αυξημένο προβληματισμό για την επιτήρηση, την αναγκαιότητα εγκατάστασης και τη σωστή διαχείριση του υλικού. Αυτό δείχνει ότι αξιολογείς σοβαρά τις πιθανές αρνητικές συνέπειες της χρήσης CCTV."
    };
  }

  return {
    type: "balanced",
    title: "Η στάση σου είναι περισσότερο ισορροπημένη.",
    text:
      "Οι απαντήσεις σου δείχνουν ότι αναγνωρίζεις τόσο τη χρησιμότητα των CCTV όσο και τους περιορισμούς ή κινδύνους που τα συνοδεύουν. Φαίνεται ότι αντιμετωπίζεις το θέμα με πιο σύνθετο και σταθμισμένο τρόπο."
  };
}

function saveResult(result) {
  localStorage.setItem(STORAGE_KEYS.result, JSON.stringify(result));
}

function loadResult() {
  const rawResult = localStorage.getItem(STORAGE_KEYS.result);

  if (!rawResult) {
    return null;
  }

  try {
    return JSON.parse(rawResult);
  } catch {
    return null;
  }
}

async function renderQuestionResult(result) {
  const resultSection = document.getElementById("result-section");
  const resultTitle = document.getElementById("result-title");
  const resultText = document.getElementById("result-text");

  if (!resultSection || !resultTitle || !resultText) return;

  resultTitle.textContent = result.title;
  resultText.textContent = result.text;
  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });

  // Δεν μπλοκάρουμε την εμφάνιση του προσωπικού αποτελέσματος.
  // Τα συγκεντρωτικά στοιχεία φορτώνονται αμέσως μετά, στο ίδιο τμήμα.
  const profileKey = getSelectedProfileKey();
  loadAggregateConclusion(profileKey);
}

async function loadAggregateConclusion(profileKey) {
  const box = document.getElementById("aggregate-conclusion");
  if (!box) return;

  const saved = localStorage.getItem(STORAGE_KEYS.answers);
  let userAnswers = [];
  try {
    userAnswers = saved ? JSON.parse(saved).answers || [] : [];
  } catch (_) {
    userAnswers = [];
  }

  box.innerHTML = `
    <h3>Τι απάντησε η πλειοψηφία της ομάδας σου;</h3>
    <p>${escapeHtml(getMajorityIntro(profileKey))}</p>
    <p class="majority-loading">Φόρτωση των απαντήσεων της ομάδας…</p>
  `;

  try {
    const stats = await loadOnlineStatistics(profileKey);
    const profileQuestions = questionnaires[profileKey]?.questions || [];
    const profileTexts = majorityTexts[profileKey] || [];

    if (!stats.total || !stats.questions.length) {
      box.innerHTML += `<p>Δεν υπάρχουν ακόμη αρκετές καταγεγραμμένες απαντήσεις στην ίδια κατηγορία για να υπολογιστεί πλειοψηφία.</p>`;
      return;
    }

    const cards = stats.questions.map((questionStats, questionIndex) => {
      const counts = (questionStats.counts || [0, 0, 0]).map(Number);
      const max = Math.max(...counts);
      let winners = counts
        .map((count, index) => ({ count, index }))
        .filter(item => item.count === max && max > 0);

      // Σε ισοπαλία κρατάμε μόνο την απάντηση που επέλεξε ο συγκεκριμένος χρήστης.
      if (winners.length > 1) {
        const userAnswer = Number(userAnswers[questionIndex]);
        if (userAnswer >= 1 && userAnswer <= 3) {
          const selectedWinner = winners.find(item => item.index === userAnswer - 1);
          if (selectedWinner) winners = [selectedWinner];
        }
      }

      const question = profileQuestions[questionIndex];
      const textsForQuestion = profileTexts[questionIndex] || [];
      if (!question || !winners.length) return "";

      const winnerBlocks = winners.map(({ count, index }) => {
        const percentage = Math.round((count / stats.total) * 100);
        const answerName = question.options[index] || `Απάντηση ${index + 1}`;
        const text = textsForQuestion[index] || "Δεν υπάρχει διαθέσιμο κείμενο για αυτή την απάντηση.";
        return `
          <div class="majority-answer">
            <p><strong>Η απάντηση της πλειοψηφίας:</strong> «${escapeHtml(answerName)}»</p>
            <p>${escapeHtml(text)}</p>
            <p class="majority-percentage"><strong>${percentage}%</strong> (${count} από ${stats.total} άτομα)</p>
          </div>
        `;
      }).join("");

      return `
        <article class="question-card majority-question-card">
          <p class="question-step">Ερώτηση ${questionIndex + 1}</p>
          <h4>${escapeHtml(question.title)}</h4>
          ${winnerBlocks}
        </article>
      `;
    }).join("");

    box.innerHTML = `
      <h3>Τι απάντησε η πλειοψηφία της ομάδας σου;</h3>
      <p>${escapeHtml(getMajorityIntro(profileKey))}</p>
      <div class="majority-results">${cards}</div>
    `;
  } catch (error) {
    console.error("Σφάλμα σύγκρισης με την ομάδα:", error);
    box.innerHTML = `
      <h3>Τι απάντησε η πλειοψηφία της ομάδας σου;</h3>
      <p>${escapeHtml(getMajorityIntro(profileKey))}</p>
      <p>Η απάντησή σου καταγράφηκε. Τα συγκεντρωτικά στοιχεία της ομάδας δεν ήταν διαθέσιμα αυτή τη στιγμή.</p>
    `;
  }
}

function renderInfoResult() {
  const resultSection = document.getElementById("personalized-result-section");
  const resultTitle = document.getElementById("personalized-result-title");
  const resultText = document.getElementById("personalized-result-text");

  if (!resultSection || !resultTitle || !resultText) {
    return;
  }

  const savedResult = loadResult();

  if (!savedResult) {
    return;
  }

  resultTitle.textContent = savedResult.title;
  resultText.textContent = savedResult.text;
  resultSection.hidden = false;
}

function renderQuestionsPage() {
  const profileTitle = document.getElementById("profile-title");
  const profileDescription = document.getElementById("profile-description");
  const questionsWrapper = document.getElementById("questions-wrapper");
  const questionsForm = document.getElementById("questions-form");

  if (!profileTitle || !profileDescription || !questionsWrapper || !questionsForm) {
    return;
  }

  const selectedProfileKey = getSelectedProfileKey();
  const selectedProfile = questionnaires[selectedProfileKey];

  if (!selectedProfile) {
    renderMissingProfileState(profileTitle, profileDescription, questionsWrapper, questionsForm);
    return;
  }

  profileTitle.textContent = selectedProfile.title;
  profileDescription.textContent = selectedProfile.description;

  questionsWrapper.innerHTML = selectedProfile.questions
    .map((question, index) => createQuestionMarkup(question, index))
    .join("");

  questionsForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const isValid = validateAnswers(selectedProfile.questions.length);

    if (!isValid) {
      alert("Παρακαλώ απάντησε σε όλες τις ερωτήσεις πριν συνεχίσεις.");
      return;
    }

    const answers = collectAnswers(selectedProfile.questions.length);
    saveAnswers(selectedProfileKey, answers);

    const result = evaluateAnswers(selectedProfileKey, answers);
    saveResult(result);

    const submitButton = document.getElementById("submit-button");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute("aria-busy", "true");
    }

    const submitStatus = document.getElementById("submit-status");
    if (submitStatus) {
      submitStatus.textContent = "Αποθήκευση απάντησης…";
      submitStatus.className = "submit-status";
    }

    const serverResult = await submitViaGoogleSheet(
      selectedProfileKey,
      answers,
      result
    );

    if (submitStatus) {
      if (serverResult.saved) {
        submitStatus.textContent = "Η απάντησή σου καταγράφηκε επιτυχώς.";
        submitStatus.className = "submit-status success";
      } else {
        submitStatus.textContent =
          "Το προσωπικό σου αποτέλεσμα εμφανίζεται κανονικά, αλλά η online συλλογή δεν έχει ρυθμιστεί ακόμη.";
        submitStatus.className = "submit-status warning";
      }
    }

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
    }

    renderQuestionResult(result);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestionsPage();
  renderInfoResult();
});
