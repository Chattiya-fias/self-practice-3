document.addEventListener("DOMContentLoaded", () => {
      /* ============ helper เรียก API ============ */
      async function apiGet(apiPath) {
        const url = `${apiBase}${apiPath}`;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(url, { headers });

        if (res.status === 401) {
          // token ใช้ไม่ได้แล้ว → รอบหน้าบังคับให้ login ใหม่ (ทั้ง local + prod)
          sessionStorage.setItem("forceLogin", "1");
          location.href = "./keycloak.html";
          throw new Error("Unauthorized");
        }
        if (!res.ok) throw new Error(`Bad status ${res.status}`);
        return res.json();
      }

      /* ============ Declaration Status ============ */
      const statusEl = document.querySelector(".ecors-declared-plan p");

      // เลือก field สำหรับ studentId จาก token
      const studentId =
        info.studentId ||
        info.student_id ||
        info.preferred_username ||
        info.sub;

      (async () => {
        if (!statusEl) return;

        if (!studentId) {
          statusEl.textContent = "Declaration Status: Not Declared";
          return;
        }

        try {
          // 1) เรียก declared-plan ก่อน
          const declaredRes = await fetch(
            `${apiBase}/students/${encodeURIComponent(studentId)}/declared-plan`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (declaredRes.status === 404) {
            statusEl.textContent = "Declaration Status: Not Declared";
            return;
          }
          if (!declaredRes.ok) {
            throw new Error(`Declared-plan bad status ${declaredRes.status}`);
          }

          const declared = await declaredRes.json(); // { studentId, planId, ... }

          // 2) ดึง study plans ทั้งหมด
          const plans = await apiGet("/study-plans"); // => http://localhost:3000/api/study-plans

          // 3) หา plan ตาม planId
          const plan = plans.find(
            (p) => String(p.id) === String(declared.planId)
          );

          if (!plan) {
            statusEl.textContent =
              "Declaration Status: Declared (unknown plan)";
            return;
          }

          const planCode = plan.planCode;
          const planNameEng = plan.nameEng;

          // 4) จัดการเวลา
          const updatedRaw =
            declared.updatedAt ||
            declared.updated_at ||
            declared.updated ||
            declared.createdAt;

          if (!updatedRaw) {
            statusEl.textContent =
              `Declaration Status: Declared ${planCode} - ${planNameEng}`;
            return;
          }

          const updated = new Date(updatedRaw);
          const userTimeZone =
            Intl.DateTimeFormat().resolvedOptions().timeZone;

          const formatted = updated.toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: userTimeZone,
          });

          statusEl.textContent =
            `Declaration Status: Declared ${planCode} - ${planNameEng} ` +
            `on ${formatted} (${userTimeZone})`;
        } catch (err) {
          console.error("Load declared plan failed:", err);
          statusEl.textContent = "Declaration Status: Not Declared";
        }
      })();
      
    });