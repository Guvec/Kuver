# Uygulama kararları ve sonraki geliştirmeler

## Kullanıcının bağlayıcı kararları

- Platform birden fazla konu ve birden fazla oyun barındıracak.
- Kuver bunlardan yalnız bir bölüm olacak.
- Kuver türleri yalnız **Basit Kuver** ve **Tabldot Kuver** olacak.
- Bir oturumda bir mola hakkı yeterli; artırılmayacak.
- Gönderilen kuver fotoğrafı tabldot kuver örneğinde kullanılacak.
- Kuver, beslenme ilkeleri ve bulaşık makinesi temizliği soruları ayrı klasörlerde tutulacak.
- Sonradan gönderilecek PDF'lerdeki eşleştirme, kelime kartları ve çoktan seçmeli sorular ilgili konuya aktarılacak.

## Bu sürümde yapılanlar

- Tek oyun ana menüsü, konu klasörleri ve alt oyunlarla değiştirildi.
- Düzey adları kaldırıldı; basit ve tabldot kuver eklendi.
- Yanlış düzeyde örnek görsel gösterme sorunu giderildi.
- Bağımsız denemede her soruda tüm hedefler korunuyor; önceki yanıtlar yeni sorunun doğru yerini ele vermiyor.
- İpucuyla öğrenme ile bağımsız deneme raporları ayrıldı.
- İkinci denemede düzeltme +5 puanla görünür kılındı.
- Somut araç/konum ipuçları, açıklayıcı hedef adları, klavye odağı ve modal odak sınırı eklendi.
- Tek mola hakkı korundu, adı “Mola ver” yapıldı.
- Adını Bul oturumu 10 soruyla sınırlandı.
- Raporun görsel sürümüne ek olarak okunabilir HTML özeti eklendi.
- Fotoğraftaki su bardağı CSS ile aynı kaynak görselden gösteriliyor; ayrı uzun bardak referans tutarsızlığı giderildi.
- Soru/kart verileri arayüz kodundan ayrıldı. Eksik PDF'ler açıkça “henüz eklenmedi” olarak gösteriliyor.

## PDF aktarımında yapılacaklar

1. Her dosyanın konu, sayfa sayısı ve kart/soru listesini çıkar.
2. Soru metni ve doğru harfi kaynakla tek tek doğrula; seçenek harflerini değiştirme.
3. Kart görsellerini aynı kart adıyla eşleştir; yeni görsel üretme.
4. Güvenlik ve teknik ifadelerde belirsizlik varsa öğretmene kısa bulgu listesi ver; tahminle cevap anahtarı yazma.
5. PDF'nin oyun kuralını koru. Kelime kartlarını otomatik olarak tanım sorusuna dönüştürme.
6. Önce konu bazında tamamla; sonra cihaz ve sonuç raporu kontrolü yap.

## Henüz yapılmayanlar

- Mutfak Araçları eşleştirme kartları eklendi (28.10.2026). Kuver, beslenme ve bulaşık makinesi PDF'leri gelmediği için bu konuların içeriği henüz boş.
- Kullanıcının GitHub hesabına erişilip commit/push yapılmadı; yayımlama kullanıcıya ait.
- Kamera, öğrenci fotoğrafı yükleme, öğrenci verisi sunucuya gönderme veya cihazlar arası senkronizasyon eklenmedi.
