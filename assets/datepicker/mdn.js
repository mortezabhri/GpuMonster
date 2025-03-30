/*!
 *
 * Bootstrap 5+ Persian Date Time Picker
 * https://github.com/Mds92/MD.BootstrapPersianDateTimePicker
 * version : 4.2.6
 * Written By Mohammad Dayyan, Mordad 1397 - 1402
 * mds.soft@gmail.com - @mdssoft
 *
 */
(() => {
    var e = {
        8: (e, t, a) => {
            "use strict";
            a.r(t), a.d(t, {MdsPersianDateTimePicker: () => r, MdsPersianDateTimePickerSetting: () => s});
            const n = bootstrap;

            class r {
                constructor(e, t) {
                    var a;
                    if (this.guid = "", this.bsPopover = null, this.bsModal = null, this.tempTitleString = "", this.hideYearsBox = (e, t) => {
                        if (t.inLine) {
                            const t = e.closest("[data-mds-dtp-guid]");
                            if (null == t) return;
                            const a = t.querySelector("[mds-dtp-inline-header]");
                            this.tempTitleString && null != a && (a.innerHTML = this.tempTitleString);
                            const n = t.querySelector("[data-mds-dtp-year-list-box]");
                            null != n && (n.classList.add("w-0"), n.innerHTML = "");
                            const r = t.querySelector('[data-name="dtp-years-container"]');
                            null != r && (r.classList.add("w-0"), r.innerHTML = ""), t.classList.remove("overflow-hidden")
                        } else {
                            const a = t.modalMode ? this.getModal() : this.getPopover(e);
                            if (null == a) return;
                            this.tempTitleString && (t.modalMode ? a.querySelector("[data-mds-dtp-title] .modal-title").innerHTML = this.tempTitleString : a.querySelector("[data-mds-dtp-title]").innerHTML = this.tempTitleString, a.querySelector('[data-name="mds-dtp-body"]').removeAttribute("hidden"));
                            const n = a.querySelector("[data-mds-dtp-year-list-box]");
                            n.classList.add("w-0"), n.innerHTML = ""
                        }
                    }, this.showYearsBox = e => {
                        const t = r.getInstance(e);
                        if (!t) return;
                        const a = t.setting,
                            n = a.inLine ? e.closest("[data-mds-dtp-guid]") : e.closest("[data-mds-dtp]");
                        if (null == n) return;
                        this.tempTitleString = a.inLine ? n.querySelector("[mds-dtp-inline-header]").textContent.trim() : n.querySelector("[data-mds-dtp-title]").textContent.trim();
                        const s = this.getYearsBoxBodyHtml(a, 0), o = s.html,
                            i = n.querySelector("[data-mds-dtp-year-list-box]");
                        this.setPopoverHeaderHtml(e, a, this.getYearsBoxHeaderHtml(a, s.yearStart, s.yearEnd)), i.innerHTML = o, i.classList.remove("w-0"), a.inLine ? (n.classList.add("overflow-hidden"), i.classList.add("inline")) : a.modalMode ? n.querySelector('[data-name="mds-dtp-body"]').setAttribute("hidden", "") : i.classList.remove("inline")
                    }, this.changeYearList = e => {
                        const t = r.getInstance(e);
                        if (!t) return;
                        const a = t.setting, n = "1" == e.getAttribute("data-year-range-button-change"),
                            s = Number(e.getAttribute("data-year")),
                            o = this.getYearsBoxBodyHtml(a, n ? s : s - 2 * a.yearOffset);
                        a.inLine ? e.closest("[data-mds-dtp-guid]").querySelector("[data-mds-dtp-year-list-box]").innerHTML = o.html : e.closest("[data-mds-dtp]").querySelector("[data-mds-dtp-year-list-box]").innerHTML = o.html, this.setPopoverHeaderHtml(e, a, this.getYearsBoxHeaderHtml(a, o.yearStart, o.yearEnd))
                    }, this.setPopoverHeaderHtml = (e, t, a) => {
                        if (null != this.bsPopover) {
                            const t = this.getPopover(e);
                            if (null == t) return;
                            t.querySelector("[data-mds-dtp-title]").innerHTML = a
                        } else if (t.inLine) {
                            let t = e.closest("[data-mds-dtp-guid]").querySelector('[data-name="dtp-years-container"]');
                            t.innerHTML = a, t.classList.remove("w-0")
                        } else if (t.modalMode) {
                            e.closest("[data-mds-dtp-guid]").querySelector("[data-mds-dtp-title] .modal-title").innerHTML = a
                        }
                    }, this.updateCalendarBodyHtml = (e, t, a = !1) => {
                        const n = this.getDateTimePickerBodyHtml(t),
                            r = n.match(/<th mds-dtp-inline-header\b[^>]*>(.*?)<\/th>/gim)[0];
                        if (this.tempTitleString = r, !t.inLine && a && !t.modalMode) {
                            const e = this.getBsPopoverInstance();
                            return e ? void setTimeout((() => {
                                e.setContent({".popover-header": r, ".popover-body": n})
                            }), 100) : void console.error("mds.bs.datetimepicker: `BsPopoverInstance` is null!")
                        }
                        let s = e.closest('[data-name="mds-dtp-body"]');
                        if (null == s) {
                            if (s = e.closest("[data-mds-dtp-guid]"), null == s) return void console.error("mds.bs.datetimepicker: `data-mds-dtp-guid` element not found !");
                            t.modalMode && (s = s.querySelector('[data-name="mds-dtp-body"]'))
                        }
                        null != s ? (this.setPopoverHeaderHtml(e, t, r.trim()), s.innerHTML = n, this.hideYearsBox(e, t), this.enableEvents(), this.enableInLineEvents()) : console.error("mds.bs.datetimepicker: `data-mds-dtp-guid` element not found!")
                    }, this.changeMonth = e => {
                        const t = r.getInstance(e);
                        if (!t) return;
                        if (t.setting.disabled) return;
                        const a = Number(e.getAttribute("data-number")), n = t.setting;
                        let s = r.getClonedDate(n.selectedDateToShow);
                        s = r.getDateTime4(a, s, n.isGregorian), n.selectedDateToShow = r.getClonedDate(s), i.set(t.guid, t), this.updateCalendarBodyHtml(e, n), null != n.calendarViewOnChange && n.calendarViewOnChange(s)
                    }, this.selectDay = e => {
                        var t;
                        const a = r.getInstance(e);
                        if (!a) return;
                        if (a.setting.disabled || null != e.getAttribute("disabled")) return;
                        let n = Number(e.getAttribute("data-number"));
                        const s = a.setting, o = null != e.getAttribute("disabled");
                        null == s.selectedDate || s.enableTimePicker || (s.selectedDate.setHours(0), s.selectedDate.setMinutes(0), s.selectedDate.setSeconds(0));
                        let l = s.selectedDate ? r.getDateTimeJson1(s.selectedDate) : null,
                            d = s.selectedDateToShow ? r.getClonedDate(s.selectedDateToShow) : new Date,
                            m = r.getDateTimeJson1(d);
                        if (o) null != s.onDayClick && s.onDayClick(s); else {
                            if (d = r.getDateTime4(n, d, s.isGregorian), s.rangeSelector) {
                                if (null != s.rangeSelectorStartDate && null != s.rangeSelectorEndDate) {
                                    s.selectedRangeDate = [], s.rangeSelectorStartDate = null, s.rangeSelectorEndDate = null;
                                    let a = "[data-mds-dtp]";
                                    s.inLine && (a = "[data-mds-dtp-guid]"), null === (t = e.closest(a)) || void 0 === t || t.querySelectorAll("td.selected-range-days-start-end,td.selected-range-days").forEach((e => {
                                        e.classList.remove("selected-range-days"), e.classList.remove("selected-range-days-start-end")
                                    }))
                                }
                                if (null == s.rangeSelectorStartDate) e.classList.add("selected-range-days-start-end"), s.rangeSelectorStartDate = r.getClonedDate(d), s.selectedDate = r.getClonedDate(d), s.selectedDateToShow = r.getClonedDate(d); else if (null != s.rangeSelectorStartDate && null == s.rangeSelectorEndDate) {
                                    if (s.rangeSelectorStartDate.getTime() >= d.getTime()) return;
                                    e.classList.add("selected-range-days-start-end"), s.rangeSelectorEndDate = r.getClonedDate(d), r.setSelectedData(s)
                                }
                                return i.set(a.guid, a), void (null != s.rangeSelectorStartDate && null != s.rangeSelectorEndDate && (s.selectedRangeDate = [r.getClonedDate(s.rangeSelectorStartDate), r.getClonedDate(s.rangeSelectorEndDate)], s.inLine ? this.updateCalendarBodyHtml(e, s) : a.hide()))
                            }
                            if (s.selectedDate = r.getClonedDate(d), null == s.selectedDate || s.enableTimePicker || (s.selectedDate.setHours(0), s.selectedDate.setMinutes(0), s.selectedDate.setSeconds(0)), s.selectedDateToShow = r.getClonedDate(d), null != l && (s.enableTimePicker ? (l.hour = m.hour, l.minute = m.minute, l.second = m.second) : (l.hour = 0, l.minute = 0, l.second = 0), s.selectedDate.setHours(l.hour), s.selectedDate.setMinutes(l.minute), s.selectedDate.setSeconds(l.second)), i.set(a.guid, a), r.setSelectedData(s), e.setAttribute("data-mds-dtp-selected-day", ""), s.toDate || s.fromDate) {
                                const t = document.querySelector(`[data-mds-dtp-group="${s.groupId}"][data-to-date]`),
                                    a = document.querySelector(`[data-mds-dtp-group="${s.groupId}"][data-from-date]`);
                                if (s.fromDate && null != t) {
                                    const e = r.getInstance(t);
                                    null != e && (s.inLine ? this.updateCalendarBodyHtml(t, e.setting) : e.initializeBsPopover(e.setting))
                                } else if (s.toDate && null != a) {
                                    const e = r.getInstance(a);
                                    null != e && (s.inLine ? this.updateCalendarBodyHtml(a, e.setting) : e.initializeBsPopover(e.setting))
                                } else this.updateCalendarBodyHtml(e, s)
                            } else this.updateCalendarBodyHtml(e, s, !0);
                            null != s.onDayClick && s.onDayClick(s), s.inLine ? e.closest(`[data-mds-dtp-guid="${this.guid}"]`).querySelectorAll("[data-day]").forEach((e => e.removeAttribute("data-mds-dtp-selected-day"))) : a.hide()
                        }
                    }, this.hoverOnDays = e => {
                        const t = e.target, a = r.getInstance(t);
                        if (!a) return;
                        const n = a.setting;
                        if (null != t.getAttribute("disabled") || !n.rangeSelector || null != n.rangeSelectorStartDate && null != n.rangeSelectorEndDate) return;
                        const s = Number(t.getAttribute("data-number")),
                            o = [].slice.call(document.querySelectorAll("td[data-day]"));
                        o.forEach((e => {
                            e.classList.remove("selected-range-days"), e.classList.remove("selected-range-days-nm")
                        }));
                        const i = [].slice.call(document.querySelectorAll("td[data-nm]"));
                        i.forEach((e => {
                            e.classList.remove("selected-range-days"), e.classList.remove("selected-range-days-nm")
                        }));
                        const l = n.rangeSelectorStartDate ? r.getClonedDate(n.rangeSelectorStartDate) : void 0,
                            d = n.rangeSelectorEndDate ? r.getClonedDate(n.rangeSelectorEndDate) : void 0;
                        let m = 0, c = 0;
                        if (n.isGregorian ? (m = l ? r.convertToNumber3(l) : 0, c = d ? r.convertToNumber3(d) : 0) : (m = l ? r.convertToNumber1(r.getDateTimeJsonPersian1(l)) : 0, c = d ? r.convertToNumber1(r.getDateTimeJsonPersian1(d)) : 0), m > 0 && s > m) for (var u = m; u <= s; u++) o.filter((e => e.getAttribute("data-number") == u.toString() && e.classList.value.indexOf("selected-range-days-start-end") <= -1)).forEach((e => e.classList.add("selected-range-days"))), i.filter((e => e.getAttribute("data-number") == u.toString() && e.classList.value.indexOf("selected-range-days-start-end") <= -1)).forEach((e => e.classList.add("selected-range-days-nm"))); else if (c > 0 && s < c) for (var g = s; g <= c; g++) o.filter((e => e.getAttribute("data-number") == g.toString() && e.classList.value.indexOf("selected-range-days-start-end") <= -1)).forEach((e => e.classList.add("selected-range-days"))), i.filter((e => e.getAttribute("data-number") == g.toString() && e.classList.value.indexOf("selected-range-days-start-end") <= -1)).forEach((e => e.classList.add("selected-range-days-nm")))
                    }, this.goToday = e => {
                        const t = e.target, a = r.getInstance(t);
                        if (!a) return;
                        const n = a.setting;
                        n.selectedDateToShow = new Date, i.set(a.guid, a), this.updateCalendarBodyHtml(t, n)
                    }, this.timeChanged = e => {
                        const t = e.target, a = r.getInstance(t);
                        if (!a) return;
                        const n = a.setting, s = t.value;
                        if (!n.enableTimePicker) return;
                        null == n.selectedDateToShow && (n.selectedDateToShow = new Date);
                        let o = Number(s.substr(0, 2)), l = Number(s.substr(3, 2));
                        n.selectedDateToShow = new Date(n.selectedDateToShow.setHours(o)), n.selectedDateToShow = new Date(n.selectedDateToShow.setMinutes(l)), null == n.selectedDate && (n.selectedDate = new Date), n.selectedDate = new Date(n.selectedDate.setHours(o)), n.selectedDate = new Date(n.selectedDate.setMinutes(l)), i.set(a.guid, a), r.setSelectedData(n)
                    }, this.popoverInsertedEvent = e => {
                        const t = e.target, a = r.getInstance(t);
                        if (!a) return;
                        const n = a.setting;
                        this.hideYearsBox(t, n)
                    }, this.popoverOrModalShownEvent = () => {
                        this.enableEvents()
                    }, this.popoverOrModalHiddenEvent = () => {
                        this.disableEvents()
                    }, this.selectCorrectClickEvent = e => {
                        const t = e.target, a = r.getInstance(t);
                        a && (null == a || !a.setting.disabled && null == a.element.getAttribute("disabled")) && (null != t.getAttribute("mds-pdtp-select-year-button") ? a.showYearsBox(t) : null != t.getAttribute("data-mds-dtp-go-today") ? this.goToday(e) : null != t.getAttribute("data-day") ? this.selectDay(t) : t.getAttribute("data-mds-hide-year-list-box") ? this.hideYearsBox(t, a.setting) : t.getAttribute("data-change-date-button") ? this.changeMonth(t) : null != t.getAttribute("data-year-range-button-change") && null == t.getAttribute("disabled") && this.changeYearList(t))
                    }, this.showPopoverEvent = e => {
                        i.getAll().forEach((e => e.hide()));
                        const t = e.target, a = r.getInstance(t);
                        null == a || a.setting.disabled || a.show()
                    }, this.hidePopoverEvent = e => {
                        const t = e.target;
                        if ("HTML" == t.tagName) return void i.getAll().forEach((e => e.setting.modalMode ? () => {
                        } : e.hide()));
                        null != t.closest("[data-mds-dtp]") || null != t.getAttribute("data-mds-dtp-guid") || null != t.getAttribute("data-mds-dtp-go-today") || i.getAll().forEach((e => e.hide()))
                    }, t = r.extend(new s, t), !e) throw new Error("MdsPersianDateTimePicker => element is null!");
                    if (t.rangeSelector && (t.toDate || t.fromDate)) throw new Error("MdsPersianDateTimePicker => You can not set true 'toDate' or 'fromDate' and 'rangeSelector' together");
                    if (t.toDate && t.fromDate) throw new Error("MdsPersianDateTimePicker => You can not set true 'toDate' and 'fromDate' together");
                    if (!t.groupId && (t.toDate || t.fromDate)) throw new Error("MdsPersianDateTimePicker => When you set 'toDate' or 'fromDate' true, you have to set 'groupId'");
                    t.textFormat || (t.textFormat = "yyyy/MM/dd", t.enableTimePicker && (t.textFormat += " HH:mm")), t.dateFormat || (t.dateFormat = "yyyy/MM/dd", t.enableTimePicker && (t.dateFormat += " HH:mm")), t.yearOffset > 15 && (t.yearOffset = 15), this.setting = t, this.setting.selectedDate = t.selectedDate ? r.getClonedDate(t.selectedDate) : null, this.setting.selectedDateToShow = null !== (a = r.getClonedDate(t.selectedDateToShow)) && void 0 !== a ? a : new Date, this.guid = r.newGuid(), this.element = e, this.element.setAttribute("data-mds-dtp-guid", this.guid), i.set(this.guid, this), this.initializeBsPopover(t)
                }

                static toJalali(e, t, a) {
                    return this.d2j(this.g2d(e, t, a))
                }

                static toGregorian(e, t, a) {
                    return this.d2g(this.j2d(e, t, a))
                }

                static isLeapJalaliYear(e) {
                    return 0 === this.jalCal(e).leap
                }

                static jalCal(e) {
                    let t, a, n, r,
                        s = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178],
                        o = s.length, i = e + 621, l = -14, d = s[0], m = 1;
                    if (e < d || e >= s[o - 1]) throw new Error("Invalid Jalali year " + e);
                    for (r = 1; r < o && (t = s[r], m = t - d, !(e < t)); r += 1) l = l + 8 * this.div(m, 33) + this.div(this.mod(m, 33), 4), d = t;
                    n = e - d, l = l + 8 * this.div(n, 33) + this.div(this.mod(n, 33) + 3, 4), 4 === this.mod(m, 33) && m - n == 4 && (l += 1);
                    let c = 20 + l - (this.div(i, 4) - this.div(3 * (this.div(i, 100) + 1), 4) - 150);
                    return m - n < 6 && (n = n - m + 33 * this.div(m + 4, 33)), a = this.mod(this.mod(n + 1, 33) - 1, 4), -1 === a && (a = 4), {
                        leap: a,
                        gy: i,
                        march: c
                    }
                }

                static j2d(e, t, a) {
                    let n = this.jalCal(e);
                    return this.g2d(n.gy, 3, n.march) + 31 * (t - 1) - this.div(t, 7) * (t - 7) + a - 1
                }

                static d2j(e) {
                    let t, a, n, r = this.d2g(e).gy, s = r - 621, o = this.jalCal(s);
                    if (n = e - this.g2d(r, 3, o.march), n >= 0) {
                        if (n <= 185) return a = 1 + this.div(n, 31), t = this.mod(n, 31) + 1, {jy: s, jm: a, jd: t};
                        n -= 186
                    } else s -= 1, n += 179, 1 === o.leap && (n += 1);
                    return a = 7 + this.div(n, 30), t = this.mod(n, 30) + 1, {jy: s, jm: a, jd: t}
                }

                static g2d(e, t, a) {
                    let n = this.div(1461 * (e + this.div(t - 8, 6) + 100100), 4) + this.div(153 * this.mod(t + 9, 12) + 2, 5) + a - 34840408;
                    return n = n - this.div(3 * this.div(e + 100100 + this.div(t - 8, 6), 100), 4) + 752, n
                }

                static d2g(e) {
                    let t;
                    t = 4 * e + 139361631, t = t + 4 * this.div(3 * this.div(4 * e + 183187720, 146097), 4) - 3908;
                    let a = 5 * this.div(this.mod(t, 1461), 4) + 308, n = this.div(this.mod(a, 153), 5) + 1,
                        r = this.mod(this.div(a, 153), 12) + 1;
                    return {gy: this.div(t, 1461) - 100100 + this.div(8 - r, 6), gm: r, gd: n}
                }

                static div(e, t) {
                    return ~~(e / t)
                }

                static mod(e, t) {
                    return e - ~~(e / t) * t
                }

                initializeBsPopover(e) {
                    if (e.rangeSelector && (e.toDate || e.fromDate)) throw new Error("MdsPersianDateTimePicker => You can not set true 'toDate' or 'fromDate' and 'rangeSelector' together");
                    if (e.toDate && e.fromDate) throw new Error("MdsPersianDateTimePicker => You can not set true 'toDate' and 'fromDate' together");
                    if (!e.groupId && (e.toDate || e.fromDate)) throw new Error("MdsPersianDateTimePicker => When you set 'toDate' or 'fromDate' true, you have to set 'groupId'");
                    e.disabled ? this.element.setAttribute("disabled", "") : this.element.removeAttribute("disabled"), (e.toDate || e.fromDate) && (e.rangeSelector = !1, this.element.setAttribute("data-mds-dtp-group", e.groupId), e.toDate ? this.element.setAttribute("data-to-date", "true") : e.fromDate && this.element.setAttribute("data-from-date", "true")), e.rangeSelector || (e.rangeSelectorMonthsToShow = [0, 0]), setTimeout((() => {
                        this.dispose();
                        const t = this.getPopoverHeaderTitle(e);
                        let a = this.getDateTimePickerBodyHtml(e), s = document.createElement("div");
                        s.innerHTML = a;
                        s.querySelectorAll(".dropdown>button").forEach((t => {
                            e.disabled ? (t.setAttribute("disabled", ""), t.classList.add("disabled")) : (t.removeAttribute("disabled"), t.classList.remove("disabled"))
                        })), a = s.innerHTML, 1 == e.modalMode ? (this.setModalHtml(t, a, e), this.bsPopover = null, setTimeout((() => {
                            const e = this.getModal();
                            null != e && (this.bsModal = new n.Modal(e), this.enableMainEvents())
                        }), 200)) : 1 == e.inLine ? (this.bsPopover = null, this.element.innerHTML = a, this.enableInLineEvents()) : (this.bsPopover = new n.Popover(this.element, {
                            container: "body",
                            content: a,
                            title: t,
                            html: !0,
                            placement: e.placement,
                            trigger: "manual",
                            template: r.popoverHtmlTemplate,
                            sanitize: !1
                        }), this.enableMainEvents()), r.setSelectedData(e), this.tempTitleString = t
                    }), e.inLine ? 10 : 100)
                }

                static newGuid() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e => {
                        let t = 16 * Math.random() | 0;
                        return ("x" == e ? t : 3 & t | 8).toString(16)
                    }))
                }

                static extend(...e) {
                    for (let t = 1; t < e.length; t++) for (let a in e[t]) e[t].hasOwnProperty(a) && (e[0][a] = e[t][a]);
                    return e[0]
                }

                static getClonedDate(e) {
                    return new Date(e.getTime())
                }

                static getDateTimeJson1(e) {
                    return {
                        year: e.getFullYear(),
                        month: e.getMonth() + 1,
                        day: e.getDate(),
                        hour: e.getHours(),
                        minute: e.getMinutes(),
                        second: e.getSeconds(),
                        millisecond: e.getMilliseconds(),
                        dayOfWeek: e.getDay()
                    }
                }

                static getDateTimeJson2(e) {
                    return {
                        year: Math.floor(e / 1e4),
                        month: Math.floor(e / 100) % 100,
                        day: e % 100,
                        hour: 0,
                        minute: 0,
                        second: 0,
                        millisecond: 0,
                        dayOfWeek: -1
                    }
                }

                static getDateTimeJsonPersian1(e) {
                    let t = this.toJalali(e.getFullYear(), e.getMonth() + 1, e.getDate());
                    return {
                        year: t.jy,
                        month: t.jm,
                        day: t.jd,
                        hour: e.getHours(),
                        minute: e.getMinutes(),
                        second: e.getSeconds(),
                        millisecond: e.getMilliseconds(),
                        dayOfWeek: e.getDay()
                    }
                }

                static getDateTimeJsonPersian2(e, t, a, n, s, o) {
                    this.isNumber(n) || (n = 0), this.isNumber(s) || (s = 0), this.isNumber(o) || (o = 0);
                    let i = this.toGregorian(e, t, a);
                    return r.getDateTimeJsonPersian1(new Date(i.gy, i.gm - 1, i.gd, n, s, o))
                }

                static getWeekDayName(e, t) {
                    return t ? this.weekDayNames[e] : this.weekDayNamesPersian[e]
                }

                static getMonthName(e, t) {
                    return e < 0 ? e = 11 : e > 11 && (e = 0), t ? this.monthNames[e] : this.monthNamesPersian[e]
                }

                static getWeekDayShortName(e, t) {
                    return t ? this.shortDayNames[e] : this.shortDayNamesPersian[e]
                }

                static isLeapYear(e) {
                    return this.isLeapJalaliYear(e)
                }

                static getDaysInMonthPersian(e, t) {
                    let a = 31;
                    return t > 6 && t < 12 ? a = 30 : 12 == t && (a = this.isLeapYear(e) ? 30 : 29), a
                }

                static getDaysInMonth(e, t) {
                    return new Date(e, t + 1, 0).getDate()
                }

                static getLastDayDateOfPreviousMonth(e, t) {
                    let a = r.getClonedDate(e);
                    if (t) {
                        let e = new Date(a.getFullYear(), a.getMonth() - 1, 1),
                            t = r.getDaysInMonth(e.getFullYear(), e.getMonth());
                        return new Date(e.getFullYear(), e.getMonth(), t)
                    }
                    let n = r.getDateTimeJsonPersian1(a);
                    return n.month += -1, n.month <= 0 ? (n.month = 12, n.year--) : n.month > 12 && (n.year++, n.month = 1), r.getDateTime1(n.year, n.month, r.getDaysInMonthPersian(n.year, n.month))
                }

                static getFirstDayDateOfNextMonth(e, t) {
                    let a = r.getClonedDate(e);
                    if (t) {
                        let e = new Date(a.getFullYear(), a.getMonth() + 1, 1);
                        return new Date(e.getFullYear(), e.getMonth(), 1)
                    }
                    let n = r.getDateTimeJsonPersian1(a);
                    return n.month += 1, n.month <= 0 && (n.month = 12, n.year--), n.month > 12 && (n.year++, n.month = 1), r.getDateTime1(n.year, n.month, 1)
                }

                static getDateTime1(e, t, a, n, r, s) {
                    this.isNumber(n) || (n = 0), this.isNumber(r) || (r = 0), this.isNumber(s) || (s = 0);
                    let o = this.toGregorian(e, t, a);
                    return new Date(o.gy, o.gm - 1, o.gd, n, r, s)
                }

                static getDateTime2(e) {
                    e.hour || (e.hour = 0), e.minute || (e.minute = 0), e.second || (e.second = 0);
                    let t = this.toGregorian(e.year, e.month, e.day);
                    return new Date(t.gy, t.gm - 1, t.gd, e.hour, e.minute, e.second)
                }

                static getDateTime3(e) {
                    return new Date(e.year, e.month - 1, e.day, e.hour, e.minute, e.second)
                }

                static getDateTime4(e, t, a) {
                    let n = r.getDateTimeJson2(e);
                    if (a) t = new Date(n.year, n.month - 1, n.day, t.getHours(), t.getMinutes(), t.getSeconds()); else {
                        let e = r.getDateTimeJsonPersian1(t);
                        e.year = n.year, e.month = n.month, e.day = n.day, t = this.getDateTime2(e)
                    }
                    return t
                }

                static getLesserDisableBeforeDate(e) {
                    let t = null;
                    const a = new Date;
                    return e.disableBeforeToday && e.disableBeforeDate ? t = e.disableBeforeDate.getTime() <= a.getTime() ? r.getClonedDate(e.disableBeforeDate) : a : e.disableBeforeDate ? t = r.getClonedDate(e.disableBeforeDate) : e.disableBeforeToday && (t = a), null == t ? null : e.isGregorian ? r.getDateTimeJson1(t) : r.getDateTimeJsonPersian1(t)
                }

                static getBiggerDisableAfterDate(e) {
                    let t = null;
                    const a = new Date;
                    return e.disableAfterDate && e.disableAfterToday ? t = e.disableAfterDate.getTime() >= a.getTime() ? r.getClonedDate(e.disableAfterDate) : a : e.disableAfterDate ? t = r.getClonedDate(e.disableAfterDate) : e.disableAfterToday && (t = a), null == t ? null : e.isGregorian ? r.getDateTimeJson1(t) : r.getDateTimeJsonPersian1(t)
                }

                static addMonthToDateTimeJson(e, t, a) {
                    const n = Object.assign({}, e);
                    return n.day = 1, n.month += t, a ? r.getDateTimeJson1(this.getDateTime3(n)) : (n.month <= 0 && (n.month = 12, n.year--), n.month > 12 && (n.year++, n.month = 1), n)
                }

                static convertToNumber1(e) {
                    return Number(r.zeroPad(e.year) + r.zeroPad(e.month) + r.zeroPad(e.day))
                }

                static convertToNumber2(e, t, a) {
                    return Number(r.zeroPad(e) + r.zeroPad(t) + r.zeroPad(a))
                }

                static convertToNumber3(e) {
                    return r.convertToNumber1(r.getDateTimeJson1(e))
                }

                static correctOptionValue(e, t) {
                    const a = new s;
                    return Object.keys(a).filter((t => t === e)).forEach((n => {
                        switch (typeof a[n]) {
                            case"number":
                                t = +t;
                                break;
                            case"string":
                                t = t.toString();
                                break;
                            case"boolean":
                                t = !!t;
                                break;
                            case"object":
                                if (a[n] instanceof Date) t = new Date(t); else if (Array.isArray(a[n])) switch (e) {
                                    case"holidays":
                                    case"disabledDates":
                                    case"specialDates":
                                    case"selectedRangeDate":
                                        t.forEach(((e, a) => {
                                            t[a] = new Date(e)
                                        }));
                                        break;
                                    case"disabledDays":
                                    case"rangeSelectorMonthsToShow":
                                        t.forEach(((e, a) => {
                                            t[a] = +e
                                        }))
                                }
                        }
                    })), t
                }

                static getShortHour(e) {
                    let t;
                    return t = e > 12 ? e - 12 : e, t
                }

                static getAmPm(e, t) {
                    let a;
                    return a = e > 12 ? t ? "PM" : "ب.ظ" : t ? "AM" : "ق.ظ", a
                }

                static addMonthToDateTime(e, t, a) {
                    let n;
                    return a ? (n = r.getDateTimeJson1(e), n = r.addMonthToDateTimeJson(n, t, a), this.getDateTime3(n)) : (n = r.getDateTimeJsonPersian1(e), n = r.addMonthToDateTimeJson(n, t, a), this.getDateTime2(n))
                }

                static isNumber(e) {
                    return !isNaN(parseFloat(e)) && isFinite(e)
                }

                static toPersianNumber(e) {
                    if (!e) return "";
                    let t = e.toString().trim();
                    return t ? (t = t.replace(/0/gim, "۰"), t = t.replace(/1/gim, "۱"), t = t.replace(/2/gim, "۲"), t = t.replace(/3/gim, "۳"), t = t.replace(/4/gim, "۴"), t = t.replace(/5/gim, "۵"), t = t.replace(/6/gim, "۶"), t = t.replace(/7/gim, "۷"), t = t.replace(/8/gim, "۸"), t = t.replace(/9/gim, "۹"), t) : ""
                }

                static toEnglishNumber(e) {
                    if (!e) return "";
                    let t = e.toString().trim();
                    return t ? (t = t.replace(/۰/gim, "0"), t = t.replace(/۱/gim, "1"), t = t.replace(/۲/gim, "2"), t = t.replace(/۳/gim, "3"), t = t.replace(/۴/gim, "4"), t = t.replace(/۵/gim, "5"), t = t.replace(/۶/gim, "6"), t = t.replace(/۷/gim, "7"), t = t.replace(/۸/gim, "8"), t = t.replace(/۹/gim, "9"), t) : ""
                }

                static zeroPad(e, t) {
                    if (null == e || "" == e) return "00";
                    null != t && "" != t || (t = "00");
                    let a = String(t).length - String(e).length + 1;
                    return a > 0 ? new Array(a).join("0") + e : e
                }

                static getDateTimeString(e, t, a, n) {
                    return t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = t.replace(/yyyy/gm, e.year.toString())).replace(/yy/gm, (e.year % 100).toString())).replace(/MMMM/gm, r.getMonthName(e.month - 1, a))).replace(/MM/gm, r.zeroPad(e.month))).replace(/M/gm, e.month.toString())).replace(/dddd/gm, r.getWeekDayName(e.dayOfWeek, a))).replace(/dd/gm, r.zeroPad(e.day))).replace(/d/gm, e.day.toString())).replace(/HH/gm, r.zeroPad(e.hour))).replace(/H/gm, e.hour.toString())).replace(/hh/gm, r.zeroPad(this.getShortHour(e.hour).toString()))).replace(/h/gm, r.zeroPad(e.hour))).replace(/mm/gm, r.zeroPad(e.minute))).replace(/m/gm, e.minute.toString())).replace(/ss/gm, r.zeroPad(e.second))).replace(/s/gm, e.second.toString())).replace(/fff/gm, r.zeroPad(e.millisecond, "000"))).replace(/ff/gm, r.zeroPad(e.millisecond / 10))).replace(/f/gm, (e.millisecond / 100).toString())).replace(/tt/gm, this.getAmPm(e.hour, a))).replace(/t/gm, this.getAmPm(e.hour, a)[0]), n && (t = r.toPersianNumber(t)), t
                }

                static getSelectedDateTimeTextFormatted(e) {
                    return null == e.selectedDate ? "" : (e.enableTimePicker || (e.selectedDate.setHours(0), e.selectedDate.setMinutes(0), e.selectedDate.setSeconds(0)), e.rangeSelector && null != e.rangeSelectorStartDate && null != e.rangeSelectorEndDate ? r.getDateTimeString(e.isGregorian ? r.getDateTimeJson1(e.rangeSelectorStartDate) : r.getDateTimeJsonPersian1(e.rangeSelectorStartDate), e.textFormat, e.isGregorian, e.persianNumber) + " - " + r.getDateTimeString(e.isGregorian ? r.getDateTimeJson1(e.rangeSelectorEndDate) : r.getDateTimeJsonPersian1(e.rangeSelectorEndDate), e.textFormat, e.isGregorian, e.persianNumber) : r.getDateTimeString(e.isGregorian ? r.getDateTimeJson1(e.selectedDate) : r.getDateTimeJsonPersian1(e.selectedDate), e.textFormat, e.isGregorian, e.persianNumber))
                }

                static getSelectedDateFormatted(e) {
                    return !e.rangeSelector && !e.selectedDate || e.rangeSelector && !e.rangeSelectorStartDate && !e.rangeSelectorEndDate ? "" : e.rangeSelector ? r.getDateTimeString(r.getDateTimeJson1(e.rangeSelectorStartDate), e.dateFormat, !0, e.persianNumber) + " - " + r.getDateTimeString(r.getDateTimeJson1(e.rangeSelectorEndDate), e.dateFormat, !0, e.persianNumber) : r.getDateTimeString(r.getDateTimeJson1(e.selectedDate), e.dateFormat, !0, e.persianNumber)
                }

                static getDisabledDateObject(e) {
                    var t, a;
                    let n = this.getLesserDisableBeforeDate(e), s = this.getBiggerDisableAfterDate(e);
                    if ((e.fromDate || e.toDate) && e.groupId) {
                        const o = document.querySelector(`[data-mds-dtp-group="${e.groupId}"][data-to-date]`),
                            i = document.querySelector(`[data-mds-dtp-group="${e.groupId}"][data-from-date]`);
                        if (null != o && e.fromDate) {
                            const a = null === (t = r.getInstance(o)) || void 0 === t ? void 0 : t.setting,
                                n = a ? a.selectedDate : null;
                            s = n ? e.isGregorian ? r.getDateTimeJson1(n) : r.getDateTimeJsonPersian1(n) : null
                        } else if (null != i && e.toDate) {
                            const t = null === (a = r.getInstance(i)) || void 0 === a ? void 0 : a.setting,
                                s = t ? t.selectedDate : null;
                            n = s ? e.isGregorian ? r.getDateTimeJson1(s) : r.getDateTimeJsonPersian1(s) : null
                        }
                    }
                    return [n, s]
                }

                static setSelectedData(e) {
                    const t = e.targetTextSelector ? document.querySelector(e.targetTextSelector) : void 0,
                        a = e.targetDateSelector ? document.querySelector(e.targetDateSelector) : void 0,
                        n = new Event("change");
                    if (null != t) {
                        const a = this.getSelectedDateTimeTextFormatted(e);
                        if ("input" === t.tagName.toLowerCase()) t.value = a; else t.innerHTML = a;
                        t.dispatchEvent(n)
                    }
                    if (null != a) {
                        const t = this.toEnglishNumber(this.getSelectedDateFormatted(e));
                        if ("input" === a.tagName.toLowerCase()) a.value = t; else a.innerHTML = t;
                        a.dispatchEvent(n)
                    }
                }

                getPopover(e) {
                    let t = e.getAttribute("aria-describedby");
                    return null == t || "" == t ? e.closest("[data-mds-dtp]") : document.getElementById(t.toString())
                }

                getModal() {
                    return document.querySelector(`.modal[data-mds-dtp-guid="${this.guid}"]`)
                }

                setModalHtml(e, t, a) {
                    const n = this.getModal();
                    if (null == n) {
                        let a = r.modalHtmlTemplate;
                        a = a.replace(/\{\{guid\}\}/gim, this.guid);
                        const n = document.createElement("div");
                        n.innerHTML = a, n.querySelector("[data-mds-dtp-title] .modal-title").innerHTML = e, n.querySelector('[data-name="mds-dtp-body"]').innerHTML = t, document.querySelector("body").appendChild(n)
                    } else n.querySelector("[data-mds-dtp-title] .modal-title").innerHTML = e, n.querySelector('[data-name="mds-dtp-body"]').innerHTML = t;
                    const s = document.querySelector(`[data-mds-dtp-guid="${this.guid}"] .modal-dialog`);
                    null != s ? a.rangeSelector && (a.rangeSelectorMonthsToShow[0] > 0 || a.rangeSelectorMonthsToShow[1] > 0) ? s.classList.add("modal-xl") : s.classList.remove("modal-xl") : console.warn("mds.bs.datetimepicker: element with `data-mds-dtp-guid` selector not found !")
                }

                getYearsBoxBodyHtml(e, t) {
                    e.yearOffset = Number(e.yearOffset);
                    const a = r.getClonedDate(e.selectedDateToShow), n = r.getDisabledDateObject(e), s = n[0], o = n[1];
                    let i, l, d = r.dateTimePickerYearsToSelectHtmlTemplate, m = "", c = 1;
                    e.isGregorian ? (l = r.getDateTimeJson1(a), i = r.getDateTimeJson1(new Date)) : (l = r.getDateTimeJsonPersian1(a), i = r.getDateTimeJsonPersian1(new Date)), c = 1;
                    const u = t || i.year - e.yearOffset, g = t ? t + 2 * e.yearOffset : i.year + e.yearOffset;
                    for (let t = u; t < g; t++) {
                        let a = "";
                        null != s && (a = t < s.year ? "disabled" : ""), a || null == o || (a = t > o.year ? "disabled" : "");
                        let n = r.getDateTimeJson2(r.convertToNumber2(t, l.month, r.getDaysInMonthPersian(t, l.month))),
                            d = "", u = e.isGregorian ? t.toString() : r.toPersianNumber(t),
                            g = r.convertToNumber2(t, l.month, 1), h = i.year == t ? 'data-current-year="true"' : "",
                            b = l.year == t ? "data-selected-year" : "", D = "";
                        h && (D = e.isGregorian ? r.currentYearText : r.currentYearTextPersian), null != s && null != s.year && n.year < s.year && (d = "disabled"), null != o && null != o.year && n.year > o.year && (d = "disabled"), e.disableBeforeToday && n.year < i.year && (d = "disabled"), e.disableAfterToday && n.year > i.year && (d = "disabled"), 1 == c && (m += "<tr>"), m += `\n<td class="text-center" title="${D}" ${h} ${b}>\n  <button class="btn btn-sm btn-light w-100" type="button" data-change-date-button="true" data-number="${g}" ${d} ${a}>${u}</button>\n</td>\n`, 5 == c && (m += "</tr>"), c++, c > 5 && (c = 1)
                    }
                    return d = d.replace(/\{\{yearsBoxHtml\}\}/gim, m), d = d.replace(/\{\{cancelText\}\}/gim, e.isGregorian ? r.cancelText : r.cancelTextPersian), e.inLine && e.yearOffset > 15 && (d += '<div style="height: 30px;"></div>'), {
                        yearStart: u,
                        yearEnd: g,
                        html: d
                    }
                }

                getYearsBoxHeaderHtml(e, t, a) {
                    const n = ` ${t} - ${a - 1} `, s = r.getDisabledDateObject(e);
                    let o = r.popoverHeaderSelectYearHtmlTemplate;
                    return o = o.replace(/\{{rtlCssClass\}\}/gim, e.isGregorian ? "" : "rtl"), o = o.replace(/\{{dirAttrValue\}\}/gim, e.isGregorian ? "ltr" : "rtl"), o = o.replace(/\{\{yearsRangeText\}\}/gim, e.isGregorian ? n : r.toPersianNumber(n)), o = o.replace(/\{\{previousText\}\}/gim, e.isGregorian ? r.previousText : r.previousTextPersian), o = o.replace(/\{\{nextText\}\}/gim, e.isGregorian ? r.nextText : r.nextTextPersian), o = o.replace(/\{\{latestPreviousYear\}\}/gim, t > a ? a.toString() : t.toString()), o = o.replace(/\{\{latestNextYear\}\}/gim, t > a ? t.toString() : a.toString()), o = o.replace(/\{\{prevYearButtonAttr\}\}/gim, null != s[0] && t - 1 < s[0].year ? "disabled" : ""), o = o.replace(/\{\{nextYearButtonAttr\}\}/gim, null != s[1] && a + 1 > s[1].year ? "disabled" : ""), o
                }

                getDateTimePickerMonthHtml(e, t, a) {
                    let n = r.getClonedDate(e.selectedDateToShow), s = r.getClonedDate(n),
                        o = null != e.selectedDate ? r.getClonedDate(e.selectedDate) : void 0, i = t || a,
                        l = r.dateTimePickerMonthTableHtmlTemplate;
                    l = l.replace(/\{\{guid\}\}/gim, this.guid), l = l.replace(/\{\{monthTdAttribute\}\}/gim, t ? "data-next-month" : a ? "data-prev-month" : ""), l = l.replace(/\{\{monthNameAttribute\}\}/gim, i ? "" : "hidden"), l = l.replace(/\{\{theadSelectDateButtonTrAttribute\}\}/gim, i ? "hidden" : ""), l = l.replace(/\{\{weekDayShortName1CssClass\}\}/gim, e.isGregorian ? "text-danger" : ""), l = l.replace(/\{\{weekDayShortName7CssClass\}\}/gim, e.isGregorian ? "" : "text-danger"), l = l.replace(/\{\{previousYearText\}\}/gim, e.isGregorian ? r.previousYearText : r.previousYearTextPersian), l = l.replace(/\{\{previousMonthText\}\}/gim, e.isGregorian ? r.previousMonthText : r.previousMonthTextPersian), l = l.replace(/\{\{nextMonthText\}\}/gim, e.isGregorian ? r.nextMonthText : r.nextMonthTextPersian), l = l.replace(/\{\{nextYearText\}\}/gim, e.isGregorian ? r.nextYearText : r.nextYearTextPersian), l = l.replace(/\{\{monthName1\}\}/gim, r.getMonthName(0, e.isGregorian)), l = l.replace(/\{\{monthName2\}\}/gim, r.getMonthName(1, e.isGregorian)), l = l.replace(/\{\{monthName3\}\}/gim, r.getMonthName(2, e.isGregorian)), l = l.replace(/\{\{monthName4\}\}/gim, r.getMonthName(3, e.isGregorian)), l = l.replace(/\{\{monthName5\}\}/gim, r.getMonthName(4, e.isGregorian)), l = l.replace(/\{\{monthName6\}\}/gim, r.getMonthName(5, e.isGregorian)), l = l.replace(/\{\{monthName7\}\}/gim, r.getMonthName(6, e.isGregorian)), l = l.replace(/\{\{monthName8\}\}/gim, r.getMonthName(7, e.isGregorian)), l = l.replace(/\{\{monthName9\}\}/gim, r.getMonthName(8, e.isGregorian)), l = l.replace(/\{\{monthName10\}\}/gim, r.getMonthName(9, e.isGregorian)), l = l.replace(/\{\{monthName11\}\}/gim, r.getMonthName(10, e.isGregorian)), l = l.replace(/\{\{monthName12\}\}/gim, r.getMonthName(11, e.isGregorian)), l = l.replace(/\{\{weekDayShortName1\}\}/gim, r.getWeekDayShortName(0, e.isGregorian)), l = l.replace(/\{\{weekDayShortName2\}\}/gim, r.getWeekDayShortName(1, e.isGregorian)), l = l.replace(/\{\{weekDayShortName3\}\}/gim, r.getWeekDayShortName(2, e.isGregorian)), l = l.replace(/\{\{weekDayShortName4\}\}/gim, r.getWeekDayShortName(3, e.isGregorian)), l = l.replace(/\{\{weekDayShortName5\}\}/gim, r.getWeekDayShortName(4, e.isGregorian)), l = l.replace(/\{\{weekDayShortName6\}\}/gim, r.getWeekDayShortName(5, e.isGregorian)), l = l.replace(/\{\{weekDayShortName7\}\}/gim, r.getWeekDayShortName(6, e.isGregorian));
                    const d = r.getDisabledDateObject(e);
                    let m, c, u, g = 0, h = 0, b = 0, D = 0, p = 0, y = "", T = 0, v = 0,
                        S = document.createElement("TR"), M = document.createElement("TD"), f = "", N = 0, w = 0, P = 0,
                        x = 0, C = 0,
                        L = e.rangeSelector && null != e.rangeSelectorStartDate ? r.getClonedDate(e.rangeSelectorStartDate) : void 0,
                        B = e.rangeSelector && null != e.rangeSelectorEndDate ? r.getClonedDate(e.rangeSelectorEndDate) : void 0,
                        A = 0, E = 0, H = "0", k = "", G = {
                            month1DateNumber: 0,
                            month2DateNumber: 0,
                            month3DateNumber: 0,
                            month4DateNumber: 0,
                            month5DateNumber: 0,
                            month6DateNumber: 0,
                            month7DateNumber: 0,
                            month8DateNumber: 0,
                            month9DateNumber: 0,
                            month10DateNumber: 0,
                            month11DateNumber: 0,
                            month12DateNumber: 0,
                            selectMonth1ButtonCssClass: "",
                            selectMonth2ButtonCssClass: "",
                            selectMonth3ButtonCssClass: "",
                            selectMonth4ButtonCssClass: "",
                            selectMonth5ButtonCssClass: "",
                            selectMonth6ButtonCssClass: "",
                            selectMonth7ButtonCssClass: "",
                            selectMonth8ButtonCssClass: "",
                            selectMonth9ButtonCssClass: "",
                            selectMonth10ButtonCssClass: "",
                            selectMonth11ButtonCssClass: "",
                            selectMonth12ButtonCssClass: ""
                        }, J = [], Y = [], O = [], I = d[0], q = d[1], F = "", j = "", z = "", $ = "", W = "", R = !1;
                    if (e.isGregorian) {
                        for (u = r.getDateTimeJson1(s), c = r.getDateTimeJson1(new Date), m = new Date(u.year, u.month - 1, 1).getDay(), p = o ? r.convertToNumber1(r.getDateTimeJson1(o)) : 0, T = r.getDaysInMonth(u.year, u.month - 1), v = r.getDaysInMonth(u.year, u.month - 2), w = r.convertToNumber1(r.getDateTimeJson1(r.getLastDayDateOfPreviousMonth(s, !0))), P = r.convertToNumber1(r.getDateTimeJson1(r.getFirstDayDateOfNextMonth(s, !0))), s = r.getClonedDate(n), x = r.convertToNumber1(r.getDateTimeJson1(new Date(s.setFullYear(s.getFullYear() - 1)))), s = r.getClonedDate(n), C = r.convertToNumber1(r.getDateTimeJson1(new Date(s.setFullYear(s.getFullYear() + 1)))), s = r.getClonedDate(n), A = e.rangeSelector && L ? r.convertToNumber3(L) : 0, E = e.rangeSelector && B ? r.convertToNumber3(B) : 0, g = 1; g <= 12; g++) G["month" + g.toString() + "DateNumber"] = r.convertToNumber1(r.getDateTimeJson1(new Date(s.setMonth(g - 1)))), s = r.getClonedDate(n);
                        for (g = 0; g < e.holidays.length; g++) J.push(r.convertToNumber1(r.getDateTimeJson1(e.holidays[g])));
                        for (g = 0; g < e.disabledDates.length; g++) Y.push(r.convertToNumber1(r.getDateTimeJson1(e.disabledDates[g])));
                        for (g = 0; g < e.specialDates.length; g++) O.push(r.convertToNumber1(r.getDateTimeJson1(e.specialDates[g])))
                    } else {
                        for (u = r.getDateTimeJsonPersian1(s), c = r.getDateTimeJsonPersian1(new Date), m = r.getDateTimeJsonPersian2(u.year, u.month, 1, 0, 0, 0).dayOfWeek, p = o ? r.convertToNumber1(r.getDateTimeJsonPersian1(o)) : 0, T = r.getDaysInMonthPersian(u.year, u.month), v = r.getDaysInMonthPersian(u.year - 1, u.month - 1), w = r.convertToNumber1(r.getDateTimeJsonPersian1(r.getLastDayDateOfPreviousMonth(s, !1))), s = r.getClonedDate(n), P = r.convertToNumber1(r.getDateTimeJsonPersian1(r.getFirstDayDateOfNextMonth(s, !1))), s = r.getClonedDate(n), x = r.convertToNumber2(u.year - 1, u.month, u.day), C = r.convertToNumber2(u.year + 1, u.month, u.day), s = r.getClonedDate(n), A = e.rangeSelector && L ? r.convertToNumber1(r.getDateTimeJsonPersian1(L)) : 0, E = e.rangeSelector && B ? r.convertToNumber1(r.getDateTimeJsonPersian1(B)) : 0, g = 1; g <= 12; g++) G["month" + g.toString() + "DateNumber"] = r.convertToNumber2(u.year, g, r.getDaysInMonthPersian(u.year, g)), s = r.getClonedDate(n);
                        for (g = 0; g < e.holidays.length; g++) J.push(r.convertToNumber1(r.getDateTimeJsonPersian1(e.holidays[g])));
                        for (g = 0; g < e.disabledDates.length; g++) Y.push(r.convertToNumber1(r.getDateTimeJsonPersian1(e.disabledDates[g])));
                        for (g = 0; g < e.specialDates.length; g++) O.push(r.convertToNumber1(r.getDateTimeJsonPersian1(e.specialDates[g])))
                    }
                    let V = r.convertToNumber1(c), _ = e.isGregorian ? u.year.toString() : r.toPersianNumber(u.year),
                        U = I ? r.convertToNumber1(I) : void 0, K = q ? r.convertToNumber1(q) : void 0,
                        Q = r.getMonthName(u.month - 1, e.isGregorian) + " " + u.year.toString();
                    if (e.isGregorian || (Q = r.toPersianNumber(Q)), y = r.getMonthName(u.month - 1, e.isGregorian), e.yearOffset <= 0 && (F = "disabled", W = "disabled", z = "disabled"), !e.isGregorian && 6 != m || e.isGregorian && 0 != m) {
                        e.isGregorian && m--;
                        let t = r.addMonthToDateTimeJson(u, -1, e.isGregorian);
                        for (g = v - m; g <= v; g++) N = r.convertToNumber2(t.year, t.month, g), H = e.isGregorian ? r.zeroPad(g) : r.toPersianNumber(r.zeroPad(g)), M = document.createElement("TD"), M.setAttribute("data-nm", ""), M.setAttribute("data-number", N.toString()), M.innerHTML = H, e.rangeSelector && (N == A || N == E ? M.classList.add("selected-range-days-start-end") : A > 0 && E > 0 && N > A && N < E && M.classList.add("selected-range-days-nm")), e.isGregorian || 6 != D ? e.isGregorian && 0 == D && M.classList.add("text-danger") : M.classList.add("text-danger"), S.appendChild(M), b++, D++, D >= 7 && (D = 0, f += S.outerHTML, R = !0, S = document.createElement("TR"))
                    }
                    for (g = 1; g <= T; g++) {
                        for (D >= 7 && (D = 0, f += S.outerHTML, R = !0, S = document.createElement("TR")), N = r.convertToNumber2(u.year, u.month, g), H = e.isGregorian ? r.zeroPad(g) : r.toPersianNumber(r.zeroPad(g)), M = document.createElement("TD"), M.setAttribute("data-day", ""), M.setAttribute("data-number", N.toString()), M.innerHTML = H, N == V && (M.setAttribute("data-today", ""), M.setAttribute("title", e.isGregorian ? r.todayText : r.todayTextPersian), k || (k = r.getWeekDayName(D - 1 < 0 ? 0 : D - 1, e.isGregorian))), e.rangeSelector || p != N || (M.setAttribute("data-mds-dtp-selected-day", ""), k = r.getWeekDayName(D - 1 < 0 ? 0 : D - 1, e.isGregorian)), h = 0; h < J.length; h++) if (J[h] == N) {
                            M.classList.add("text-danger");
                            break
                        }
                        if (e.isGregorian || 6 != D ? e.isGregorian && 0 == D && M.classList.add("text-danger") : M.classList.add("text-danger"), e.disableBeforeToday) for (N < V && M.setAttribute("disabled", ""), P < V && ($ = "disabled"), C < V && (W = "disabled"), w < V && (j = "disabled"), x < V && (F = "disabled"), h = 1; h <= 12; h++) G["month" + h.toString() + "DateNumber"] < V && (G["selectMonth" + h.toString() + "ButtonCssClass"] = "disabled");
                        if (e.disableAfterToday) for (N > V && M.setAttribute("disabled", ""), P > V && ($ = "disabled"), C > V && (W = "disabled"), w > V && (j = "disabled"), x > V && (F = "disabled"), h = 1; h <= 12; h++) G["month" + h.toString() + "DateNumber"] > V && (G["selectMonth" + h.toString() + "ButtonCssClass"] = "disabled");
                        if (K) for (N > K && M.setAttribute("disabled", ""), P > K && ($ = "disabled"), C > K && (W = "disabled"), w > K && (j = "disabled"), x > K && (F = "disabled"), h = 1; h <= 12; h++) G["month" + h.toString() + "DateNumber"] > K && (G["selectMonth" + h.toString() + "ButtonCssClass"] = "disabled");
                        if (U) for (N < U && M.setAttribute("disabled", ""), P < U && ($ = "disabled"), C < U && (W = "disabled"), w < U && (j = "disabled"), x < U && (F = "disabled"), h = 1; h <= 12; h++) G["month" + h.toString() + "DateNumber"] < U && (G["selectMonth" + h.toString() + "ButtonCssClass"] = "disabled");
                        for (h = 0; h < Y.length; h++) N == Y[h] && M.setAttribute("disabled", "");
                        for (h = 0; h < O.length; h++) N == O[h] && M.setAttribute("data-special-date", "");
                        null != e.disabledDays && e.disabledDays.length > 0 && e.disabledDays.indexOf(D) >= 0 && M.setAttribute("disabled", ""), e.rangeSelector && (N == A || N == E ? M.classList.add("selected-range-days-start-end") : A > 0 && E > 0 && N > A && N < E && M.classList.add("selected-range-days")), S.appendChild(M), R = !1, D++, b++
                    }
                    D >= 7 && (D = 0, f += S.outerHTML, R = !0, S = document.createElement("TR"));
                    let X = r.addMonthToDateTimeJson(u, 1, e.isGregorian);
                    for (g = 1; g <= 42 - b; g++) H = e.isGregorian ? r.zeroPad(g) : r.toPersianNumber(r.zeroPad(g)), N = r.convertToNumber2(X.year, X.month, g), M = document.createElement("TD"), M.setAttribute("data-nm", ""), M.setAttribute("data-number", N.toString()), M.innerHTML = H, e.rangeSelector && (N == A || N == E ? M.classList.add("selected-range-days-start-end") : A > 0 && E > 0 && N > A && N < E && M.classList.add("selected-range-days-nm")), e.isGregorian || 6 != D ? e.isGregorian && 0 == D && M.classList.add("text-danger") : M.classList.add("text-danger"), S.appendChild(M), D++, D >= 7 && (D = 0, f += S.outerHTML, R = !0, S = document.createElement("TR"));
                    return R || (f += S.outerHTML, R = !0), l = l.replace(/\{\{currentMonthInfo\}\}/gim, Q), l = l.replace(/\{\{selectedYear\}\}/gim, _), l = l.replace(/\{\{selectedMonthName\}\}/gim, y), l = l.replace(/\{\{daysHtml\}\}/gim, f), l = l.replace(/\{\{previousYearButtonDisabledAttribute\}\}/gim, F), l = l.replace(/\{\{previousYearButtonDateNumber\}\}/gim, x.toString()), l = l.replace(/\{\{previousMonthButtonDisabledAttribute\}\}/gim, j), l = l.replace(/\{\{previousMonthButtonDateNumber\}\}/gim, w.toString()), l = l.replace(/\{\{selectYearButtonDisabledAttribute\}\}/gim, z), l = l.replace(/\{\{nextMonthButtonDisabledAttribute\}\}/gim, $), l = l.replace(/\{\{nextMonthButtonDateNumber\}\}/gim, P.toString()), l = l.replace(/\{\{nextYearButtonDisabledAttribute\}\}/gim, W), l = l.replace(/\{\{nextYearButtonDateNumber\}\}/gim, C.toString()), l = l.replace(/\{\{dropDownMenuMonth1DateNumber\}\}/gim, G.month1DateNumber), l = l.replace(/\{\{dropDownMenuMonth2DateNumber\}\}/gim, G.month2DateNumber), l = l.replace(/\{\{dropDownMenuMonth3DateNumber\}\}/gim, G.month3DateNumber), l = l.replace(/\{\{dropDownMenuMonth4DateNumber\}\}/gim, G.month4DateNumber), l = l.replace(/\{\{dropDownMenuMonth5DateNumber\}\}/gim, G.month5DateNumber), l = l.replace(/\{\{dropDownMenuMonth6DateNumber\}\}/gim, G.month6DateNumber), l = l.replace(/\{\{dropDownMenuMonth7DateNumber\}\}/gim, G.month7DateNumber), l = l.replace(/\{\{dropDownMenuMonth8DateNumber\}\}/gim, G.month8DateNumber), l = l.replace(/\{\{dropDownMenuMonth9DateNumber\}\}/gim, G.month9DateNumber), l = l.replace(/\{\{dropDownMenuMonth10DateNumber\}\}/gim, G.month10DateNumber), l = l.replace(/\{\{dropDownMenuMonth11DateNumber\}\}/gim, G.month11DateNumber), l = l.replace(/\{\{dropDownMenuMonth12DateNumber\}\}/gim, G.month12DateNumber), l = l.replace(/\{\{selectMonth1ButtonCssClass\}\}/gim, G.selectMonth1ButtonCssClass), l = l.replace(/\{\{selectMonth2ButtonCssClass\}\}/gim, G.selectMonth2ButtonCssClass), l = l.replace(/\{\{selectMonth3ButtonCssClass\}\}/gim, G.selectMonth3ButtonCssClass), l = l.replace(/\{\{selectMonth4ButtonCssClass\}\}/gim, G.selectMonth4ButtonCssClass), l = l.replace(/\{\{selectMonth5ButtonCssClass\}\}/gim, G.selectMonth5ButtonCssClass), l = l.replace(/\{\{selectMonth6ButtonCssClass\}\}/gim, G.selectMonth6ButtonCssClass), l = l.replace(/\{\{selectMonth7ButtonCssClass\}\}/gim, G.selectMonth7ButtonCssClass), l = l.replace(/\{\{selectMonth8ButtonCssClass\}\}/gim, G.selectMonth8ButtonCssClass), l = l.replace(/\{\{selectMonth9ButtonCssClass\}\}/gim, G.selectMonth9ButtonCssClass), l = l.replace(/\{\{selectMonth10ButtonCssClass\}\}/gim, G.selectMonth10ButtonCssClass), l = l.replace(/\{\{selectMonth11ButtonCssClass\}\}/gim, G.selectMonth11ButtonCssClass), l = l.replace(/\{\{selectMonth12ButtonCssClass\}\}/gim, G.selectMonth12ButtonCssClass), l
                }

                getPopoverHeaderTitle(e) {
                    let t, a = "";
                    if (t = e.isGregorian ? r.getDateTimeJson1(e.selectedDateToShow) : r.getDateTimeJsonPersian1(e.selectedDateToShow), e.rangeSelector) {
                        const t = r.addMonthToDateTime(e.selectedDateToShow, -e.rangeSelectorMonthsToShow[0], e.isGregorian),
                            n = r.addMonthToDateTime(e.selectedDateToShow, e.rangeSelectorMonthsToShow[1], e.isGregorian);
                        let s, o;
                        e.isGregorian ? (s = r.getDateTimeJson1(t), o = r.getDateTimeJson1(n)) : (s = r.getDateTimeJsonPersian1(t), o = r.getDateTimeJsonPersian1(n));
                        const i = r.getMonthName(s.month - 1, e.isGregorian),
                            l = r.getMonthName(o.month - 1, e.isGregorian);
                        a = `${i} ${s.year} - ${l} ${o.year}`
                    } else a = `${r.getMonthName(t.month - 1, e.isGregorian)} ${t.year}`;
                    return e.isGregorian || (a = r.toPersianNumber(a)), a
                }

                getDateTimePickerBodyHtml(e) {
                    let t = r.getClonedDate(e.selectedDateToShow), a = r.dateTimePickerHtmlTemplate;
                    a = a.replace(/\{\{inlineAttr\}\}/gim, e.inLine ? "data-inline" : ""), a = a.replace(/\{\{rtlCssClass\}\}/gim, e.isGregorian ? "" : "rtl"), a = a.replace(/\{\{selectedDateStringAttribute\}\}/gim, e.inLine ? "" : "hidden"), a = a.replace(/\{\{goTodayText\}\}/gim, e.isGregorian ? r.goTodayText : r.goTodayTextPersian), a = a.replace(/\{\{timePickerAttribute\}\}/gim, e.enableTimePicker ? "" : "hidden");
                    const n = r.getDisabledDateObject(e);
                    let s, o, i = "", l = "", d = n[0], m = n[1];
                    e.isGregorian ? (o = r.getDateTimeJson1(t), s = r.getDateTimeJson1(new Date)) : (o = r.getDateTimeJsonPersian1(t), s = r.getDateTimeJsonPersian1(new Date)), i = this.getPopoverHeaderTitle(e), l = `${e.isGregorian ? "Today," : "امروز،"} ${s.day} ${r.getMonthName(s.month - 1, e.isGregorian)} ${s.year}`, e.isGregorian || (l = r.toPersianNumber(l)), null != m && m.year <= o.year && m.month < o.month && (t = e.isGregorian ? new Date(m.year, m.month - 1, 1) : r.getDateTime1(m.year, m.month, m.day)), null != d && d.year >= o.year && d.month > o.month && (t = e.isGregorian ? new Date(d.year, d.month - 1, 1) : r.getDateTime1(d.year, d.month, d.day));
                    let c = "", u = e.rangeSelectorMonthsToShow[1] <= 0 ? 0 : e.rangeSelectorMonthsToShow[1],
                        g = e.rangeSelectorMonthsToShow[0] <= 0 ? 0 : e.rangeSelectorMonthsToShow[0];
                    g *= -1;
                    for (let a = g; a < 0; a++) e.selectedDateToShow = r.addMonthToDateTime(r.getClonedDate(t), a, e.isGregorian), c += this.getDateTimePickerMonthHtml(e, !1, !0);
                    e.selectedDateToShow = r.getClonedDate(t), c += this.getDateTimePickerMonthHtml(e, !1, !1);
                    for (let a = 1; a <= u; a++) e.selectedDateToShow = r.addMonthToDateTime(r.getClonedDate(t), a, e.isGregorian), c += this.getDateTimePickerMonthHtml(e, !0, !1);
                    let h = Math.abs(g) + 1 + u, b = h > 1 ? "width: " + (100 / h).toString() + "%;" : "";
                    return c = c.replace(/\{\{monthTdStyle\}\}/gim, b), a = a.replace(/\{\{dtpInlineHeader\}\}/gim, i), a = a.replace(/\{\{todayDateString\}\}/gim, l), a = a.replace(/\{\{time\}\}/gim, `${r.zeroPad(o.hour)}:${r.zeroPad(o.minute)}`), a = a.replace(/\{\{monthsTdHtml\}\}/gim, c), a
                }

                enableMainEvents() {
                    if (!this.setting.inLine) if (null != this.bsPopover) this.element.addEventListener("shown.bs.popover", this.popoverOrModalShownEvent), this.element.addEventListener("hidden.bs.popover", this.popoverOrModalHiddenEvent), this.element.addEventListener("inserted.bs.popover", this.popoverInsertedEvent), this.element.addEventListener("click", this.showPopoverEvent, !0); else if (null != this.bsModal) {
                        const e = this.getModal();
                        if (null == e) return void console.error("mds.bs.datetimepicker: `modalElement` not found!");
                        e.addEventListener("shown.bs.modal", this.popoverOrModalShownEvent), e.addEventListener("hidden.bs.modal", this.popoverOrModalHiddenEvent)
                    }
                }

                enableInLineEvents() {
                    this.setting.inLine && setTimeout((() => {
                        var e;
                        const t = document.querySelector(`[data-mds-dtp-guid="${this.guid}"]`);
                        null != t && (null === (e = t.querySelector("[data-mds-dtp-time]")) || void 0 === e || e.addEventListener("change", this.timeChanged, !1), t.addEventListener("click", this.selectCorrectClickEvent), t.querySelectorAll("[data-day]").forEach((e => e.addEventListener("mouseenter", this.hoverOnDays, !0))))
                    }), 100)
                }

                enableEvents() {
                    this.setting.inLine || setTimeout((() => {
                        document.addEventListener("click", this.selectCorrectClickEvent, !1), document.querySelector("html").addEventListener("click", this.hidePopoverEvent, !0), document.querySelectorAll("[data-mds-dtp-time]").forEach((e => e.addEventListener("change", this.timeChanged, !1))), document.querySelectorAll("[data-mds-dtp] [data-day]").forEach((e => e.addEventListener("mouseenter", this.hoverOnDays, !0)))
                    }), 500)
                }

                disableEvents() {
                    var e, t;
                    document.removeEventListener("click", this.selectCorrectClickEvent), document.querySelector("html").removeEventListener("click", this.hidePopoverEvent), null === (e = document.querySelectorAll("[data-mds-dtp-time]")) || void 0 === e || e.forEach((e => e.removeEventListener("change", this.timeChanged))), document.querySelectorAll("[data-mds-dtp] [data-day]").forEach((e => e.removeEventListener("mouseenter", this.hoverOnDays)));
                    const a = document.querySelector(`[data-mds-dtp-guid="${this.guid}"]`);
                    null != a && (a.removeEventListener("click", this.selectCorrectClickEvent, !1), null === (t = a.querySelectorAll("[data-day]")) || void 0 === t || t.forEach((e => e.removeEventListener("mouseenter", this.hoverOnDays, !0))))
                }

                show() {
                    var e, t;
                    null === (e = this.bsModal) || void 0 === e || e.show(), null === (t = this.bsPopover) || void 0 === t || t.show()
                }

                hide() {
                    var e, t;
                    null === (e = this.bsModal) || void 0 === e || e.hide(), null === (t = this.bsPopover) || void 0 === t || t.hide()
                }

                toggle() {
                    null != this.bsPopover && this.bsPopover.toggle()
                }

                enable() {
                    this.setting.disabled = !1, this.element.removeAttribute("disabled"), i.set(this.guid, this), null != this.bsPopover && this.bsPopover.enable()
                }

                disable() {
                    this.setting.disabled = !0, this.element.setAttribute("disabled", ""), i.set(this.guid, this), null != this.bsPopover && this.bsPopover.disable()
                }

                updatePosition() {
                    var e, t;
                    null === (e = this.bsPopover) || void 0 === e || e.update(), null === (t = this.bsModal) || void 0 === t || t.handleUpdate()
                }

                updateSelectedDateText() {
                    r.setSelectedData(this.setting)
                }

                dispose() {
                    null != this.bsPopover && this.bsPopover.dispose(), null != this.bsModal && this.bsModal.dispose(), this.element.removeEventListener("click", this.showPopoverEvent), this.bsPopover = null, this.bsModal = null
                }

                getBsPopoverInstance() {
                    return this.bsPopover
                }

                getBsModalInstance() {
                    return this.bsModal
                }

                getText() {
                    return r.getSelectedDateFormatted(this.setting)
                }

                getSelectedDate() {
                    return this.setting.selectedDate
                }

                getSelectedDateRange() {
                    return this.setting.selectedRangeDate
                }

                setDate(e) {
                    this.updateOptions({selectedDate: e, selectedDateToShow: e})
                }

                setDatePersian(e, t, a) {
                    const n = r.toGregorian(e, t, a);
                    console.log(n);
                    const s = new Date(n.gy, n.gm - 1, n.gd);
                    this.updateOptions({selectedDate: s, selectedDateToShow: s})
                }

                setDateRange(e, t) {
                    this.updateOptions({selectedDate: e, selectedDateToShow: e, selectedRangeDate: [e, t]})
                }

                clearDate() {
                    this.updateOptions({selectedDate: null, selectedDateToShow: new Date})
                }

                updateOption(e, t) {
                    e && (t = r.correctOptionValue(e, t), this.setting[e] = t, i.set(this.guid, this), this.initializeBsPopover(this.setting))
                }

                updateOptions(e) {
                    Object.keys(e).forEach((t => {
                        this.setting[t] = r.correctOptionValue(t, e[t])
                    })), i.set(this.guid, this), this.initializeBsPopover(this.setting)
                }

                static getInstance(e) {
                    var t, a, n, r, s;
                    let o = e.getAttribute("data-mds-dtp-guid");
                    if (!o && (o = null !== (a = null === (t = e.closest("[data-mds-dtp-guid]")) || void 0 === t ? void 0 : t.getAttribute("data-mds-dtp-guid")) && void 0 !== a ? a : null, !o)) {
                        const t = null === (n = e.closest("[data-mds-dtp]")) || void 0 === n ? void 0 : n.getAttribute("id");
                        if (!t) return null;
                        if (o = null !== (s = null === (r = document.querySelector('[aria-describedby="' + t + '"]')) || void 0 === r ? void 0 : r.getAttribute("data-mds-dtp-guid")) && void 0 !== s ? s : null, !o) return null
                    }
                    return i.get(o)
                }
            }

            // r.modalHtmlTemplate = '<div data-mds-dtp data-mds-dtp-guid="{{guid}}" class="modal fade mds-bs-persian-datetime-picker-modal" tabindex="-1" role="dialog" aria-hidden="true">\n  <div class="modal-dialog">\n\t  <div class="modal-content">\n      <div class="modal-header" data-mds-dtp-title="true">\n        <h5 class="modal-title">Modal title</h5>\n      </div>\n      <div class="modal-body">\n        <div class="select-year-box w-0" data-mds-dtp-year-list-box="true"></div>\n        <div data-name="mds-dtp-body"></div>\n      </div>\n    </div>\n  </div>\n</div>', r.popoverHtmlTemplate = '<div class="popover mds-bs-persian-datetime-picker-popover" role="tooltip" data-mds-dtp>\n<div class="popover-arrow"></div>\n<h3 class="popover-header text-center p-1" data-mds-dtp-title="true"></h3>\n<div class="popover-body p-0" data-name="mds-dtp-body"></div>\n</div>', r.popoverHeaderSelectYearHtmlTemplate = '<table class="table table-sm table-borderless text-center p-0 m-0 {{rtlCssClass}}" dir="{{dirAttrValue}}">\n<tr>\n<th>\n<button type="button" class="btn btn-sm btn-light w-100" title="{{previousText}}" data-year="{{latestPreviousYear}}" data-year-range-button-change="-1" {{prevYearButtonAttr}}> &lt; </button>\n</th>\n<th class="pt-1">\n{{yearsRangeText}}\n</th>\n<th>\n<button type="button" class="btn btn-sm btn-light w-100" title="{{nextText}}" data-year="{{latestNextYear}}" data-year-range-button-change="1" {{nextYearButtonAttr}}> &gt; </button>\n</th>\n</tr>\n</table>', r.dateTimePickerYearsToSelectHtmlTemplate = '<table class="table table-sm text-center p-0 m-0">\n<tbody>\n{{yearsBoxHtml}}\n<tr>\n<td colspan="100" class="text-center">\n<button class="btn btn-sm btn-light w-100" data-mds-hide-year-list-box="true">{{cancelText}}</button>\n</td>\n</tr>\n</tbody>\n</table>', r.dateTimePickerHtmlTemplate = '<div class="mds-bs-dtp-container {{rtlCssClass}}" {{inlineAttr}}>\n<div class="select-year-inline-box w-0" data-name="dtp-years-container">\n</div>\n<div class="select-year-box w-0" data-mds-dtp-year-list-box="true"></div>\n<table class="table table-sm text-center p-0 m-0">\n<thead>\n<tr {{selectedDateStringAttribute}}>\n<th mds-dtp-inline-header colspan="100">{{dtpInlineHeader}}</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n{{monthsTdHtml}}\n</tr>\n</tbody>\n<tfoot>\n<tr {{timePickerAttribute}}>\n<td colspan="100" class="text-center border-0">\n<input type="time" value="{{time}}" maxlength="2" data-mds-dtp-time />\n</td>\n</tr>\n<tr>\n<td colspan="100">\n<button type="button" class="btn btn-light" title="{{goTodayText}}" data-mds-dtp-go-today>{{todayDateString}}</button>\n</td>\n</tr>\n</tfoot>\n</table>\n</div>', r.dateTimePickerMonthTableHtmlTemplate = '<td class="border-0" style="{{monthTdStyle}}" {{monthTdAttribute}} data-td-month>\n<table class="table table-sm table-borderless">\n<thead>\n<tr {{monthNameAttribute}}>\n<th colspan="100" class="border-0">\n<table class="table table-sm table-borderless">\n<thead>\n<tr>\n<th>\n<button type="button" class="btn btn-light"> {{currentMonthInfo}} </button>\n</th>\n</tr>\n</thead>\n</table>\n</th>\n</tr>\n<tr {{theadSelectDateButtonTrAttribute}}>\n<td colspan="100" class="border-0">\n<table class="table table-sm table-borderless">\n<tr>\n<th>\n<button type="button" class="btn btn-light btn-sm w-100" style="height: 42px;display: flex;justify-content: center;align-items: center ; font-size: 60px" title="{{previousYearText}}" data-change-date-button="true" data-number="{{previousYearButtonDateNumber}}" {{previousYearButtonDisabledAttribute}}>&gt;&gt;</button>\n</th>\n<th>\n<button type="button" class="btn btn-light btn-sm w-100" title="{{previousMonthText}}" data-change-date-button="true" data-number="{{previousMonthButtonDateNumber}}" {{previousMonthButtonDisabledAttribute}}> &lt; </button>\n</th>\n<th style="width: 120px;">\n<div class="dropdown">\n<button type="button" class="btn btn-light btn-sm dropdown-toggle w-100" id="mdtp-month-selector-button-{{guid}}"\ndata-bs-toggle="dropdown" aria-expanded="false">\n{{selectedMonthName}}\n</button>\n<div class="dropdown-menu" aria-labelledby="mdtp-month-selector-button-{{guid}}">\n<a class="dropdown-item {{selectMonth1ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth1DateNumber}}">{{monthName1}}</a>\n<a class="dropdown-item {{selectMonth2ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth2DateNumber}}">{{monthName2}}</a>\n<a class="dropdown-item {{selectMonth3ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth3DateNumber}}">{{monthName3}}</a>\n<div class="dropdown-divider"></div>\n<a class="dropdown-item {{selectMonth4ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth4DateNumber}}">{{monthName4}}</a>\n<a class="dropdown-item {{selectMonth5ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth5DateNumber}}">{{monthName5}}</a>\n<a class="dropdown-item {{selectMonth6ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth6DateNumber}}">{{monthName6}}</a>\n<div class="dropdown-divider"></div>\n<a class="dropdown-item {{selectMonth7ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth7DateNumber}}">{{monthName7}}</a>\n<a class="dropdown-item {{selectMonth8ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth8DateNumber}}">{{monthName8}}</a>\n<a class="dropdown-item {{selectMonth9ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth9DateNumber}}">{{monthName9}}</a>\n<div class="dropdown-divider"></div>\n<a class="dropdown-item {{selectMonth10ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth10DateNumber}}">{{monthName10}}</a>\n<a class="dropdown-item {{selectMonth11ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth11DateNumber}}">{{monthName11}}</a>\n<a class="dropdown-item {{selectMonth12ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth12DateNumber}}">{{monthName12}}</a>\n</div>\n</div>\n</th>\n<th style="width: 50px;">\n<button type="button" class="btn btn-light btn-sm w-100" mds-pdtp-select-year-button {{selectYearButtonDisabledAttribute}}>{{selectedYear}}</button>\n</th>\n<th>\n<button type="button" class="btn btn-light btn-sm w-100" title="{{nextMonthText}}" data-change-date-button="true" data-number="{{nextMonthButtonDateNumber}}" {{nextMonthButtonDisabledAttribute}}> &gt; </button>\n</th>\n<th>\n<button type="button" class="btn btn-light btn-sm w-100" title="{{nextYearText}}" data-change-date-button="true" data-number="{{nextYearButtonDateNumber}}" {{nextYearButtonDisabledAttribute}}> &gt;&gt; </button>\n</th>\n</tr>\n</table>\n</td>\n</tr>\n</thead>\n<tbody class="days">\n<tr>\n<td class="{{weekDayShortName1CssClass}}">{{weekDayShortName1}}</td>\n<td>{{weekDayShortName2}}</td>\n<td>{{weekDayShortName3}}</td>\n<td>{{weekDayShortName4}}</td>\n<td>{{weekDayShortName5}}</td>\n<td>{{weekDayShortName6}}</td>\n<td class="{{weekDayShortName7CssClass}}">{{weekDayShortName7}}</td>\n</tr>\n{{daysHtml}}\n</tbody>\n</table>\n</td>', r.previousYearTextPersian = "سال قبل", r.previousMonthTextPersian = "ماه قبل", r.previousTextPersian = "قبلی", r.nextYearTextPersian = "سال بعد", r.nextMonthTextPersian = "ماه بعد", r.nextTextPersian = "بعدی", r.todayTextPersian = "امروز", r.goTodayTextPersian = "برو به امروز", r.cancelTextPersian = "انصراف", r.currentYearTextPersian = "سال جاری", r.previousText = "Previous", r.previousYearText = "Previous Year", r.previousMonthText = "Previous Month", r.nextText = "Next", r.nextYearText = "Next Year", r.nextMonthText = "Next Month", r.todayText = "Today", r.goTodayText = "Go Today", r.cancelText = "Cancel", r.currentYearText = "Current Year", r.shortDayNamesPersian = ["شنبه", "یک شنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"], r.shortDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], r.monthNamesPersian = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"], r.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], r.weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], r.weekDayNamesPersian = ["یک شنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه"], r.convertDateToString = (e, t, a) => r.getDateTimeString(t ? r.getDateTimeJson1(e) : r.getDateTimeJsonPersian1(e), a, t, !t), r.convertDateToJalali = e => {
            r.modalHtmlTemplate = '<div data-mds-dtp data-mds-dtp-guid="{{guid}}" class="modal fade mds-bs-persian-datetime-picker-modal" tabindex="-1" role="dialog" aria-hidden="true">\n  <div class="modal-dialog">\n\t  <div class="modal-content">\n      <div class="modal-header" data-mds-dtp-title="true">\n        <h5 class="modal-title">Modal title</h5>\n      </div>\n      <div class="modal-body">\n        <div class="select-year-box w-0" data-mds-dtp-year-list-box="true"></div>\n        <div data-name="mds-dtp-body"></div>\n      </div>\n    </div>\n  </div>\n</div>', r.popoverHtmlTemplate = '<div class="popover mds-bs-persian-datetime-picker-popover" role="tooltip" data-mds-dtp>\n<div class="popover-arrow"></div>\n<h3 class="popover-header text-center p-1" data-mds-dtp-title="true"></h3>\n<div class="popover-body p-0" data-name="mds-dtp-body"></div>\n</div>', r.popoverHeaderSelectYearHtmlTemplate = '<table class="table table-sm table-borderless text-center p-0 m-0 {{rtlCssClass}}" dir="{{dirAttrValue}}">\n<tr>\n<th>\n<button type="button" class="btn btn-sm btn-light w-100" title="{{previousText}}" data-year="{{latestPreviousYear}}" data-year-range-button-change="-1" {{prevYearButtonAttr}}> &lt; </button>\n</th>\n<th class="pt-1">\n{{yearsRangeText}}\n</th>\n<th>\n<button type="button" class="btn btn-sm btn-light w-100" title="{{nextText}}" data-year="{{latestNextYear}}" data-year-range-button-change="1" {{nextYearButtonAttr}}> &gt; </button>\n</th>\n</tr>\n</table>', r.dateTimePickerYearsToSelectHtmlTemplate = '<table class="table table-sm text-center p-0 m-0">\n<tbody>\n{{yearsBoxHtml}}\n<tr>\n<td colspan="100" class="text-center">\n<button class="btn btn-sm btn-light w-100" data-mds-hide-year-list-box="true">{{cancelText}}</button>\n</td>\n</tr>\n</tbody>\n</table>', r.dateTimePickerHtmlTemplate = '<div class="mds-bs-dtp-container {{rtlCssClass}}" {{inlineAttr}}>\n<div class="select-year-inline-box w-0" data-name="dtp-years-container">\n</div>\n<div class="select-year-box w-0" data-mds-dtp-year-list-box="true"></div>\n<table class="table table-sm text-center p-0 m-0">\n<thead>\n<tr {{selectedDateStringAttribute}}>\n<th mds-dtp-inline-header colspan="100">{{dtpInlineHeader}}</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n{{monthsTdHtml}}\n</tr>\n</tbody>\n<tfoot>\n<tr {{timePickerAttribute}}>\n<td colspan="100" class="text-center border-0">\n<input type="time" value="{{time}}" maxlength="2" data-mds-dtp-time />\n</td>\n</tr>\n<tr>\n<td colspan="100">\n<button type="button" class="btn btn-light" title="{{goTodayText}}" data-mds-dtp-go-today>{{todayDateString}}</button>\n</td>\n</tr>\n</tfoot>\n</table>\n</div>', r.dateTimePickerMonthTableHtmlTemplate = '<td class="border-0" style="{{monthTdStyle}}" {{monthTdAttribute}} data-td-month>\n<table class="table table-sm table-borderless">\n<thead>\n<tr {{monthNameAttribute}}>\n<th colspan="100" class="border-0">\n<table class="table table-sm table-borderless">\n<thead>\n<tr>\n<th>\n<button type="button" class="btn btn-light"> {{currentMonthInfo}} </button>\n</th>\n</tr>\n</thead>\n</table>\n</th>\n</tr>\n<tr {{theadSelectDateButtonTrAttribute}}>\n<td colspan="100" class="border-0">\n<table class="table table-sm table-borderless">\n<tr>\n<th>\n<button type="button" class=" btn-light btn-sm justify-center items-center" style="width: 68px;height: 68px;display: flex;background-color: transparent !important;" title="{{previousMonthText}}" data-change-date-button="true" data-number="{{previousMonthButtonDateNumber}}" {{previousMonthButtonDisabledAttribute}}> <svg style="pointer-events: none;width: 100%;height: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">\n<path d="M10.5 9L13.5 12L10.5 15" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n<path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>\n</svg> </button>\n</th>\n<th style="width: 60px;">\n<div class="dropdown">\n<button type="button" class="YearsChoise btn-sm dropdown-toggle w-100" id="mdtp-month-selector-button-{{guid}}"\ndata-bs-toggle="dropdown" aria-expanded="false">\n{{selectedMonthName}}\n</button>\n<div class="dropdown-menu" aria-labelledby="mdtp-month-selector-button-{{guid}}">\n<a class="dropdown-item {{selectMonth1ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth1DateNumber}}">{{monthName1}}</a>\n<a class="dropdown-item {{selectMonth2ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth2DateNumber}}">{{monthName2}}</a>\n<a class="dropdown-item {{selectMonth3ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth3DateNumber}}">{{monthName3}}</a>\n<div class="dropdown-divider"></div>\n<a class="dropdown-item {{selectMonth4ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth4DateNumber}}">{{monthName4}}</a>\n<a class="dropdown-item {{selectMonth5ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth5DateNumber}}">{{monthName5}}</a>\n<a class="dropdown-item {{selectMonth6ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth6DateNumber}}">{{monthName6}}</a>\n<div class="dropdown-divider"></div>\n<a class="dropdown-item {{selectMonth7ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth7DateNumber}}">{{monthName7}}</a>\n<a class="dropdown-item {{selectMonth8ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth8DateNumber}}">{{monthName8}}</a>\n<a class="dropdown-item {{selectMonth9ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth9DateNumber}}">{{monthName9}}</a>\n<div class="dropdown-divider"></div>\n<a class="dropdown-item {{selectMonth10ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth10DateNumber}}">{{monthName10}}</a>\n<a class="dropdown-item {{selectMonth11ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth11DateNumber}}">{{monthName11}}</a>\n<a class="dropdown-item {{selectMonth12ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth12DateNumber}}">{{monthName12}}</a>\n</div>\n</div>\n</th>\n<th style="width: 60px">\n<button type="button" class="MonthChoise" style="padding: 8px !important;" mds-pdtp-select-year-button {{selectYearButtonDisabledAttribute}}>{{selectedYear}}</button>\n</th>\n<th>\n<button type="button" class="btn-sm justify-start items-center" style="margin-inline-start: auto;width: 68px;height: 68px;display: flex;" title="{{nextMonthText}}" data-change-date-button="true" data-number="{{nextMonthButtonDateNumber}}" {{nextMonthButtonDisabledAttribute}}><svg  style="pointer-events: none;width: 100%;height: 100%;" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">\n' +
                '<path d="M13.5 9L10.5 12L13.5 15" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>\n' +
                '</svg></button>\n</th>\n</tr>\n</table>\n</td>\n</tr>\n</thead>\n<tbody class="days">\n<tr>\n<td class="{{weekDayShortName1CssClass}}">{{weekDayShortName1}}</td>\n<td>{{weekDayShortName2}}</td>\n<td>{{weekDayShortName3}}</td>\n<td>{{weekDayShortName4}}</td>\n<td>{{weekDayShortName5}}</td>\n<td>{{weekDayShortName6}}</td>\n<td class="{{weekDayShortName7CssClass}}">{{weekDayShortName7}}</td>\n</tr>\n{{daysHtml}}\n</tbody>\n</table>\n</td>', r.previousYearTextPersian = "سال قبل", r.previousMonthTextPersian = "ماه قبل", r.previousTextPersian = "قبلی", r.nextYearTextPersian = "سال بعد", r.nextMonthTextPersian = "ماه بعد", r.nextTextPersian = "بعدی", r.todayTextPersian = "امروز", r.goTodayTextPersian = "برو به امروز", r.cancelTextPersian = "انصراف", r.currentYearTextPersian = "سال جاری", r.previousText = "Previous", r.previousYearText = "Previous Year", r.previousMonthText = "Previous Month", r.nextText = "Next", r.nextYearText = "Next Year", r.nextMonthText = "Next Month", r.todayText = "Today", r.goTodayText = "Go Today", r.cancelText = "Cancel", r.currentYearText = "Current Year", r.shortDayNamesPersian = ["شنبه", "یک شنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"], r.shortDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], r.monthNamesPersian = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"], r.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], r.weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], r.weekDayNamesPersian = ["یک شنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه"], r.convertDateToString = (e, t, a) => r.getDateTimeString(t ? r.getDateTimeJson1(e) : r.getDateTimeJsonPersian1(e), a, t, !t), r.convertDateToJalali = e => {
                const t = r.getDateTimeJson1(e), a = r.toJalali(t.year, t.month, t.day);
                return {year: a.jy, month: a.jm, day: a.jd}
            };

            class s {
                constructor() {
                    this.placement = "bottom", this.enableTimePicker = !1, this.targetTextSelector = "", this.targetDateSelector = "", this.toDate = !1, this.fromDate = !1, this.groupId = "", this.disabled = !1, this.textFormat = "", this.dateFormat = "", this.isGregorian = !1, this.inLine = !1, this.selectedDate = null, this.selectedDateToShow = new Date, this.yearOffset = 15, this.holidays = [], this.disabledDates = [], this.disabledDays = [], this.specialDates = [], this.disableBeforeToday = !1, this.disableAfterToday = !1, this.disableBeforeDate = null, this.disableAfterDate = null, this.rangeSelector = !1, this.rangeSelectorStartDate = null, this.rangeSelectorEndDate = null, this.rangeSelectorMonthsToShow = [0, 0], this.selectedRangeDate = [], this.modalMode = !1, this.persianNumber = !1, this.calendarViewOnChange = e => {
                    }, this.onDayClick = e => {
                    }
                }
            }

            const o = new Map;
            var i = {
                set(e, t) {
                    o.has(e), o.set(e, t)
                }, get: e => o.get(e) || null, getAll: () => Array.from(o, (([e, t]) => t)), remove(e) {
                    o.has(e) && o.delete(e)
                }
            }
        }, 160: (e, t, a) => {
            "use strict";
            e.exports = function () {
                if ("object" == typeof globalThis) return globalThis;
                var e;
                try {
                    e = this || new Function("return this")()
                } catch (e) {
                    if ("object" == typeof window) return window;
                    if ("object" == typeof self) return self;
                    if (void 0 !== a.g) return a.g
                }
                return e
            }()
        }, 209: (e, t, a) => {
            var n = a(8), r = a(160);
            void 0 === r.mds && (r.mds = n), e.exports = n
        }
    }, t = {};

    function a(n) {
        var r = t[n];
        if (void 0 !== r) return r.exports;
        var s = t[n] = {exports: {}};
        return e[n](s, s.exports, a), s.exports
    }

    a.d = (e, t) => {
        for (var n in t) a.o(t, n) && !a.o(e, n) && Object.defineProperty(e, n, {enumerable: !0, get: t[n]})
    }, a.g = function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), a.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    };
    a(209)
})();
//# sourceMappingURL=mds.bs.datetimepicker.js.map
//------------code edited-----------
// r.shortDayNamesPersian = ["ش", "ی", "د", "س", "چ", "پ", "ج"]