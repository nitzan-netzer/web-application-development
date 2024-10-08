'use client';

import React, { useState } from 'react';
import styles from '../styles/policy.module.css';

export default function Policy() {
    const [openSection, setOpenSection] = useState<number | null>(null);

    const toggleSection = (section: number) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className={styles['policy-container']}>
            <div className={styles['policy-header']}>
                <b>ברוכים הבאים לאתר החנות שלנו</b>
                <p>התקנון הבא מסדיר את נהלי האתר, תנאי השימוש, המכירה והקנייה, והגינות המסחר באתר. אנא קראו בעיון את התקנון לפני השימוש באתר. השימוש באתר מהווה הסכמה לתנאים המפורטים להלן</p>
            </div>
            
                <div className={styles["card"]}>
                    <div className={styles['card-header']} onClick={() => toggleSection(1)}>
                            1. שעות פעילות
                    </div>
                    {openSection === 1 && (
                        <div className={styles['card-body']}>
                            האתר פעיל 24 שעות ביממה, שבעה ימים בשבוע
                            <br />
                            תמיכה טכנית ושירות לקוחות זמינים בין השעות 09:00 - 18:00, בימים ראשון עד חמישי
                            <br></br>
                        </div>
                    )}
                </div>

                <div className={styles["card"]}>
                    <div className={styles['card-header']} onClick={() => toggleSection(2)} >
                            2. מכירה
                    </div>
                    {openSection === 2 && (
                        <div className={styles['card-body']}>
                            כל הפריטים המוצעים למכירה באתר הם פריטים יד שנייה במצב טוב
                            <br />
                            תיאור המוצר באתר נועד לספק את כל המידע הנחוץ, כולל תמונות ומצב הפריט
                            <br />
                            כל הפריטים נבדקים טרם פרסומם למכירה, ומובטח כי הם במצב תקין, אלא אם כן מצוין אחרת
                            <br />
                            לאחר ביצוע רכישה, לא תתאפשר החלפה או ביטול אלא אם כן הוכח כי המוצר שהתקבל אינו תואם את התיאור באתר
                            <br></br>
                        </div>
                    )}
                </div>

                <div className={styles["card"]}>
                    <div className={styles['card-header']} onClick={() => toggleSection(3)}>
                            3. קנייה
                    </div>
                    {openSection === 3 && (
                        <div className={styles['card-body']}>
                            על הרוכש לוודא כי הפרטים שהוזנו בעת ההזמנה נכונים ומלאים
                            <br />
                            התשלום עבור הפריטים יבוצע דרך פלטפורמות תשלום מאובטחות המקובלות באתר
                            <br />
                            לאחר השלמת ההזמנה, אישור הזמנה יישלח בדוא"ל
                            <br />
                            זמן המשלוח עשוי להשתנות בהתאם למקום המגורים של הרוכש, אך ישנה התחייבות לספק את המוצרים תוך 7 ימי עסקים
                            <br></br>
                        </div>
                    )}
                </div>

                <div className={styles["card"]}>
                    <div className={styles['card-header']} onClick={() => toggleSection(4)} >
                            4. הגינות
                    </div>
                    {openSection === 4 && (
                        <div className={styles['card-body']}>
                            החנות מתחייבת לפעול בהגינות ובשקיפות מול הלקוחות, ולספק מידע מהימן ומדויק אודות הפריטים הנמכרים
                            <br />
                            האתר שומר לעצמו את הזכות לסרב למכור או לבטל הזמנה במקרה של הפרה של תנאי השימוש באתר או חשד לפעילות לא הוגנת
                            <br></br>
                        </div>
                    )}
                </div>

                <div className={styles["card"]}>
                    <div className={styles['card-header']} onClick={() => toggleSection(5)} >
                            5. שירות לקוחות
                    </div>
                    {openSection === 5 && (
                        <div className={styles['card-body']}>
                            במקרים של בעיות או תלונות, ניתן לפנות לשירות הלקוחות דרך טופס יצירת קשר באתר או באמצעות דוא"ל
                            <br />
                            כל פנייה תיענה תוך 2 ימי עסקים
                            <br></br>
                        </div>
                    )}
                </div>

                <div className={styles["card"]}>
                    <div className={styles['card-header']} onClick={() => toggleSection(6)} >
                            6. קניין רוחני
                    </div>
                    {openSection === 6 && (
                        <div className={styles['card-body']}>
                            כל התכנים, התמונות והמידע באתר מוגנים בזכויות יוצרים ואין להעתיקם, לשכפלם או לעשות בהם שימוש ללא אישור מפורש בכתב מהנהלת האתר
                            <br></br>
                        </div>
                    )}
                </div>

                <div className={styles["card"]}>
                    <div className={styles['card-header']} onClick={() => toggleSection(7)} >
                            7. שינויים בתקנון
                    </div>
                    {openSection === 7 && (
                        <div className={styles['card-body']}>
                            האתר שומר לעצמו את הזכות לעדכן את התקנון מעת לעת. העדכונים ייכנסו לתוקף מרגע פרסומם באתר
                            <br />
                            השימוש המתמשך באתר מהווה הסכמה לתנאי התקנון המעודכנים
                            <br></br>
                        </div>
                    )}
                </div>
                <div className={styles["card"]}>
                    <div className={styles['card-header']} onClick={() => toggleSection(8)} >
                            8. סמכות שיפוט
                    </div>
                    {openSection === 8 && (
                        <div className={styles['card-body']}>
                            התקנון כפוף לחוקי מדינת ישראל וכל סכסוך שיתעורר בקשר לשימוש באתר יובא להכרעת בתי המשפט המוסמכים בישראל בלבד
                            <br></br>
                        </div>
                    )}
                </div>

            <p className="text-muted text-center" style={{ color: '#5d4037' }}>
                <strong>תודה על בחירתכם בחנות שלנו!</strong>
            </p>
        </div>
    );
}

